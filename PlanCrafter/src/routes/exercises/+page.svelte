<script>
  import { enhance } from '$app/forms';
  import { goto } from '$app/navigation';
  import { toast } from '$lib/toast.svelte.js';
  let { data } = $props();

  let searchQuery = $state(data.searchQuery ?? '');
  let added = $state({});
  let openPicker = $state(null);
  let showSuggestions = $state(false);

  // Suggestions from layout's searchData
  const suggestions = $derived(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    const exercises = data.exercises ?? [];
    const categories = data.categories ?? [];
    const results = [];

    categories.filter(c => c.name.toLowerCase().includes(q)).slice(0, 3).forEach(c => {
      results.push({ type: 'category', label: c.name, href: `/exercises?category=${c.slug}`, icon: '📦' });
    });
    exercises.filter(e => e.name.toLowerCase().includes(q)).slice(0, 5).forEach(e => {
      results.push({ type: 'exercise', label: e.name, href: `/exercises/${e._id}`, icon: '🏋️' });
    });
    return results.slice(0, 7);
  });

  const filteredExercises = $derived(
    searchQuery.trim()
      ? data.exercises.filter(ex => ex.name.toLowerCase().includes(searchQuery.toLowerCase()))
      : data.exercises
  );

  function categoryColor(slug) {
    const cat = data.categories.find(c => c.slug === slug);
    return cat ? cat.color : '#888';
  }

  function categoryName(slug) {
    const cat = data.categories.find(c => c.slug === slug);
    return cat ? cat.name : slug;
  }

  function togglePicker(exId) {
    openPicker = openPicker === exId ? null : exId;
  }

  function handleAddEnhance(exId, planName) {
    return () => {
      openPicker = null;
      added[exId] = true;
      return async ({ update }) => {
        await update();
        toast.show(planName ? `→ ${planName}` : data.exercises.find(e => e._id === exId)?.name ?? '');
      };
    };
  }

  function onSearchInput() {
    showSuggestions = searchQuery.trim().length > 0;
  }

  function selectSuggestion(href) {
    showSuggestions = false;
    goto(href);
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    showSuggestions = false;
  }
</script>

<div class="page">

  <h2 class="title">Exercises</h2>

  <!-- Search with suggestions -->
  <div class="search-wrapper">
    <form class="search-bar" onsubmit={handleSearchSubmit}>
      <span class="search-icon">🔍</span>
      <input
        type="text"
        bind:value={searchQuery}
        oninput={onSearchInput}
        placeholder="Übungen oder Kategorien suchen…"
        class="search-input"
        autocomplete="off"
      />
      {#if searchQuery}
        <button class="clear-btn" onclick={() => { searchQuery = ''; showSuggestions = false; }}>✕</button>
      {/if}
    </form>
    {#if showSuggestions && suggestions().length > 0}
      <div class="suggestions-dropdown">
        {#each suggestions() as s}
          <button type="button" class="suggestion-item" onclick={() => selectSuggestion(s.href)}>
            <span class="s-icon">{s.icon}</span>
            <span class="s-label">{s.label}</span>
            <span class="s-type">{s.type === 'category' ? 'Kategorie' : 'Übung'}</span>
          </button>
        {/each}
      </div>
    {/if}
  </div>

  <!-- Category filter chips -->
  <div class="filter-scroll">
    <a href="/exercises" class="chip" class:active={!data.activeCategory}>All</a>
    {#each data.categories as cat}
      <a
        href="/exercises?category={cat.slug}"
        class="chip"
        class:active={data.activeCategory === cat.slug}
      >{cat.name}</a>
    {/each}
  </div>

  {#if filteredExercises.length === 0}
    <p class="empty-hint">Keine Übungen gefunden.</p>
  {:else}
    <div class="exercise-list">
      {#each filteredExercises as ex}
        <div class="ex-card">
          <a href="/exercises/{ex._id}" class="ex-link">
            {#if ex.imageUrl}
              <img src={ex.imageUrl} alt={ex.name} class="ex-img" loading="lazy" />
            {:else}
              <div class="ex-img ex-placeholder"></div>
            {/if}
            <div class="ex-info">
              <p class="ex-name">{ex.name}</p>
              <span class="ex-badge" style="background: {categoryColor(ex.categoryId)}20; color: {categoryColor(ex.categoryId)}; border: 1px solid {categoryColor(ex.categoryId)};">
                {categoryName(ex.categoryId)}
              </span>
              <p class="ex-desc">{ex.description}</p>
            </div>
          </a>

          <div class="add-section">
            {#if added[ex._id]}
              <button type="button" class="add-btn added">✓</button>
            {:else if data.plans.length > 0}
              <button type="button" class="add-btn" onclick={() => togglePicker(ex._id)}>
                {openPicker === ex._id ? '×' : '+'}
              </button>
              {#if openPicker === ex._id}
                <div class="plan-picker">
                  <p class="picker-label">Zu Plan hinzufügen:</p>
                  <form method="POST" action="?/addToPlan" use:enhance={handleAddEnhance(ex._id, null)}>
                    <input type="hidden" name="exerciseId" value={ex._id} />
                    <button type="submit" class="picker-item">+ Neuer Entwurf</button>
                  </form>
                  {#each data.plans as plan}
                    <form method="POST" action="?/addToPlan" use:enhance={handleAddEnhance(ex._id, plan.name)}>
                      <input type="hidden" name="exerciseId" value={ex._id} />
                      <input type="hidden" name="planId" value={plan._id} />
                      <button type="submit" class="picker-item">{plan.name}</button>
                    </form>
                  {/each}
                </div>
              {/if}
            {:else}
              <form method="POST" action="?/addToPlan" use:enhance={() => {
                added[ex._id] = true;
                return async ({ update }) => { await update(); toast.show(ex.name); };
              }}>
                <input type="hidden" name="exerciseId" value={ex._id} />
                <button type="submit" class="add-btn">+</button>
              </form>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  {/if}

</div>

<style>
  .page { padding: 16px; }

  .title {
    font-size: 1.6rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 14px;
  }

  /* Search wrapper for suggestions */
  .search-wrapper {
    position: relative;
    margin-bottom: 14px;
  }

  .search-bar {
    display: flex;
    align-items: center;
    background: var(--bg-card);
    border-radius: 12px;
    padding: 10px 14px;
    gap: 10px;
  }
  .search-icon { font-size: 1rem; opacity: 0.5; }
  .search-input {
    background: transparent; border: none; outline: none;
    color: var(--text-primary); width: 100%; font-size: 0.95rem;
  }
  .search-input::placeholder { color: var(--text-secondary); }
  .clear-btn {
    background: none; border: none; color: var(--text-secondary);
    font-size: 0.85rem; cursor: pointer; flex-shrink: 0;
  }

  /* Suggestions */
  .suggestions-dropdown {
    position: absolute;
    top: 100%;
    left: 0; right: 0;
    background: var(--bg-card);
    border: 1px solid var(--border-1);
    border-top: none;
    border-radius: 0 0 12px 12px;
    z-index: 200;
    display: flex;
    flex-direction: column;
    box-shadow: 0 8px 20px var(--shadow);
  }

  .suggestion-item {
    display: flex; align-items: center; gap: 10px;
    padding: 11px 14px;
    background: none; border: none; border-bottom: 1px solid var(--border-1);
    cursor: pointer; text-align: left; color: var(--text-primary); width: 100%;
  }
  .suggestion-item:last-child { border-bottom: none; }
  .suggestion-item:hover { background: var(--bg-card-alt); }

  .s-icon { font-size: 0.95rem; flex-shrink: 0; }
  .s-label { flex: 1; font-size: 0.88rem; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .s-type { font-size: 0.7rem; color: var(--text-secondary); flex-shrink: 0; }

  /* Filter chips */
  .filter-scroll {
    display: flex;
    gap: 8px;
    overflow-x: auto;
    padding-bottom: 12px;
    scrollbar-width: none;
  }
  .filter-scroll::-webkit-scrollbar { display: none; }

  .chip {
    flex-shrink: 0;
    padding: 7px 16px;
    border-radius: 20px;
    background: var(--bg-card);
    color: var(--text-secondary);
    font-size: 0.85rem;
    font-weight: 500;
    text-decoration: none;
    white-space: nowrap;
  }
  .chip.active { background: var(--chip-active-bg); color: var(--chip-active-color); }

  .empty-hint { color: var(--text-secondary); font-size: 0.9rem; margin-top: 20px; text-align: center; }

  .exercise-list { display: flex; flex-direction: column; gap: 10px; }

  .ex-card {
    display: flex;
    align-items: center;
    background: var(--bg-card);
    border-radius: 14px;
    padding: 12px;
    gap: 12px;
  }

  .ex-link {
    display: flex;
    align-items: center;
    gap: 12px;
    flex: 1;
    text-decoration: none;
    min-width: 0;
  }

  .ex-img {
    width: 72px; height: 72px;
    border-radius: 10px; object-fit: cover; flex-shrink: 0;
  }
  .ex-placeholder { background: var(--placeholder-gradient); }

  .ex-info { display: flex; flex-direction: column; gap: 4px; min-width: 0; }

  .ex-name { font-size: 1rem; font-weight: 600; color: var(--text-primary); margin: 0; }

  .ex-badge {
    display: inline-block; font-size: 0.72rem; font-weight: 600;
    padding: 2px 10px; border-radius: 20px; width: fit-content;
  }

  .ex-desc {
    font-size: 0.8rem; color: var(--text-secondary); margin: 0;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }

  .add-section { position: relative; flex-shrink: 0; }

  .add-btn {
    width: 40px; height: 40px; border-radius: 10px;
    background: var(--btn-primary-bg); color: var(--btn-primary-color); border: none;
    font-size: 1.4rem; font-weight: 300; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.2s;
  }
  .add-btn.added { background: #14B8A6; color: #fff; font-size: 1rem; }

  .plan-picker {
    position: absolute;
    right: 0;
    top: 46px;
    background: var(--bg-card);
    border: 1px solid var(--border-1);
    border-radius: 12px;
    padding: 10px;
    z-index: 100;
    min-width: 180px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    box-shadow: 0 8px 24px var(--shadow);
  }

  .picker-label {
    font-size: 0.72rem;
    color: var(--text-secondary);
    margin: 0 0 2px;
    text-transform: uppercase;
    letter-spacing: 0.4px;
  }

  .picker-item {
    width: 100%;
    background: var(--bg-card-alt);
    border: 1px solid var(--border-1);
    border-radius: 8px;
    color: var(--text-primary);
    font-size: 0.85rem;
    padding: 8px 12px;
    cursor: pointer;
    text-align: left;
    transition: background 0.15s;
  }
  .picker-item:hover { background: var(--border-1); }
</style>

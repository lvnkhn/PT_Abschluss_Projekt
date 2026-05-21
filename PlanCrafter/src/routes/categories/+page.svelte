<script>
  import { i18n } from '$lib/i18n.svelte.js';
  let { data } = $props();

  let searchQuery = $state('');

  const filteredCategories = $derived(
    searchQuery.trim()
      ? data.categories.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
      : data.categories
  );
</script>

<div class="page">

  <h2 class="title">{i18n.t('Kategorien', 'Categories')}</h2>

  <!-- Search -->
  <div class="search-bar">
    <span class="search-icon">🔍</span>
    <input
      type="text"
      bind:value={searchQuery}
      placeholder={i18n.t('Kategorie suchen…', 'Search categories…')}
      class="search-input"
    />
    {#if searchQuery}
      <button class="clear-btn" onclick={() => searchQuery = ''}>✕</button>
    {/if}
  </div>

  <div class="category-list">
    {#each filteredCategories as cat}
      <a href="/categories/{cat.slug}" class="cat-row" style="border-left-color: {cat.color};">
        <span class="cat-icon">{cat.icon}</span>
        <div class="cat-info">
          <p class="cat-name">{cat.name}</p>
          <p class="cat-count">{cat.exerciseCount} exercises</p>
        </div>
        <span class="arrow">›</span>
      </a>
    {/each}
    {#if filteredCategories.length === 0}
      <p class="empty-hint">{i18n.t('Keine Kategorie gefunden.', 'No category found.')}</p>
    {/if}
  </div>

</div>

<style>
  .page { padding: 16px; }

  .title {
    font-size: 1.6rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 14px;
  }

  .search-bar {
    display: flex;
    align-items: center;
    background: var(--bg-card);
    border-radius: 12px;
    padding: 10px 14px;
    gap: 10px;
    margin-bottom: 14px;
  }
  .search-icon { font-size: 1rem; opacity: 0.5; }
  .search-input {
    background: transparent; border: none; outline: none;
    color: var(--text-primary); width: 100%; font-size: 0.95rem;
  }
  .search-input::placeholder { color: var(--text-secondary); }
  .clear-btn {
    background: none; border: none; color: var(--text-secondary);
    font-size: 0.85rem; cursor: pointer;
  }

  .category-list { display: flex; flex-direction: column; gap: 10px; }

  .cat-row {
    display: flex;
    align-items: center;
    gap: 14px;
    background: var(--bg-card);
    border-radius: 14px;
    padding: 16px;
    border-left: 4px solid;
    text-decoration: none;
  }

  .cat-icon { font-size: 1.8rem; line-height: 1; flex-shrink: 0; }
  .cat-info { flex: 1; }
  .cat-name { font-size: 1rem; font-weight: 700; color: var(--text-primary); margin: 0; }
  .cat-count { font-size: 0.8rem; color: var(--text-secondary); margin: 2px 0 0; }
  .arrow { color: var(--text-secondary); font-size: 1.4rem; }

  .empty-hint { color: var(--text-secondary); font-size: 0.9rem; text-align: center; margin-top: 20px; }
</style>

<script>
  import { enhance } from '$app/forms';
  let { data } = $props();

  let added = $state({});

  function categoryColor(slug) {
    const cat = data.categories.find(c => c.slug === slug);
    return cat ? cat.color : '#888';
  }

  function categoryName(slug) {
    const cat = data.categories.find(c => c.slug === slug);
    return cat ? cat.name : slug;
  }
</script>

<div class="page">

  <h2 class="title">Exercises</h2>

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

  <!-- Exercise list -->
  <div class="exercise-list">
    {#each data.exercises as ex}
      <div class="ex-card">
        <a href="/exercises/{ex._id}" class="ex-link">
          {#if ex.imageUrl}
            <img src={ex.imageUrl} alt={ex.name} class="ex-img" />
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
        <form method="POST" action="?/addToPlan" use:enhance={() => {
          added[ex._id] = true;
          return async ({ update }) => { await update(); };
        }}>
          <input type="hidden" name="exerciseId" value={ex._id} />
          <button type="submit" class="add-btn" class:added={added[ex._id]}>
            {added[ex._id] ? '✓' : '+'}
          </button>
        </form>
      </div>
    {/each}
  </div>

</div>

<style>
  .page {
    padding: 16px;
  }

  .title {
    font-size: 1.6rem;
    font-weight: 700;
    color: #fff;
    margin-bottom: 14px;
  }

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
    background: #2A2A2A;
    color: #aaa;
    font-size: 0.85rem;
    font-weight: 500;
    text-decoration: none;
    white-space: nowrap;
  }
  .chip.active {
    background: #fff;
    color: #111;
  }

  /* Exercise cards */
  .exercise-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .ex-card {
    display: flex;
    align-items: center;
    background: #2A2A2A;
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
    width: 72px;
    height: 72px;
    border-radius: 10px;
    object-fit: cover;
    flex-shrink: 0;
  }

  .ex-placeholder {
    background: linear-gradient(135deg, #333, #444);
  }

  .ex-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
  }

  .ex-name {
    font-size: 1rem;
    font-weight: 600;
    color: #fff;
    margin: 0;
  }

  .ex-badge {
    display: inline-block;
    font-size: 0.72rem;
    font-weight: 600;
    padding: 2px 10px;
    border-radius: 20px;
    width: fit-content;
  }

  .ex-desc {
    font-size: 0.8rem;
    color: #888;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .add-btn {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: #fff;
    color: #111;
    border: none;
    font-size: 1.4rem;
    font-weight: 300;
    cursor: pointer;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;
  }
  .add-btn.added {
    background: #14B8A6;
    color: #fff;
  }
</style>

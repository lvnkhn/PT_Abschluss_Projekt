<script>
  import { enhance } from '$app/forms';
  let { data } = $props();
  const cat = data.category;
  let added = $state({});
</script>

<div class="page">

  <!-- Back -->
  <a href="/categories" class="back-btn">
    <span class="back-arrow">‹</span> Categories
  </a>

  <!-- Header -->
  <div class="cat-header">
    <span class="cat-icon">{cat.icon}</span>
    <h2 class="cat-name" style="color: {cat.color};">{cat.name}</h2>
    <p class="cat-count">{data.exercises.length} exercises</p>
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
            <div class="bodyparts">
              {#each ex.bodyParts as part}
                <span class="part-badge">{part}</span>
              {/each}
            </div>
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
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .back-btn {
    display: flex;
    align-items: center;
    gap: 4px;
    color: #fff;
    text-decoration: none;
    font-size: 1rem;
    font-weight: 600;
    width: fit-content;
  }
  .back-arrow {
    font-size: 1.4rem;
    line-height: 1;
  }

  .cat-header {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 4px 0 8px;
  }
  .cat-icon {
    font-size: 2rem;
  }
  .cat-name {
    font-size: 1.6rem;
    font-weight: 700;
    margin: 0;
  }
  .cat-count {
    color: #888;
    font-size: 0.85rem;
    margin: 0;
  }

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

  .bodyparts {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }
  .part-badge {
    font-size: 0.68rem;
    font-weight: 500;
    padding: 2px 8px;
    border-radius: 6px;
    background: #383838;
    color: #aaa;
  }

  .ex-desc {
    font-size: 0.78rem;
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

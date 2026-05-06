<script>
  let { data } = $props();
</script>

<div class="page">

  <h2 class="title">Categories</h2>

  <div class="category-list">
    {#each data.categories as cat}
      <a href="/categories/{cat.slug}" class="cat-row" style="border-left-color: {cat.color};">
        <span class="cat-icon">{cat.icon}</span>
        <div class="cat-info">
          <p class="cat-name">{cat.name}</p>
          <p class="cat-count">{cat.exerciseCount} exercises</p>
        </div>
        <span class="arrow">›</span>
      </a>
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
    margin-bottom: 16px;
  }

  .category-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .cat-row {
    display: flex;
    align-items: center;
    gap: 14px;
    background: #2A2A2A;
    border-radius: 14px;
    padding: 16px;
    border-left: 4px solid;
    text-decoration: none;
  }

  .cat-icon {
    font-size: 1.8rem;
    line-height: 1;
    flex-shrink: 0;
  }

  .cat-info {
    flex: 1;
  }

  .cat-name {
    font-size: 1rem;
    font-weight: 700;
    color: #fff;
    margin: 0;
  }

  .cat-count {
    font-size: 0.8rem;
    color: #888;
    margin: 2px 0 0;
  }

  .arrow {
    color: #555;
    font-size: 1.4rem;
  }
</style>

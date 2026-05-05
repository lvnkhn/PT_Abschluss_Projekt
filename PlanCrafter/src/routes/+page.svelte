<script>
  let { data } = $props();
</script>

<div class="page">

  <!-- Greeting + Search -->
  <section class="section">
    <h2 class="greeting">Hi User</h2>
    <div class="search-bar">
      <span class="search-icon">🔍</span>
      <input type="text" placeholder="Search exercises..." class="search-input" />
    </div>
  </section>

  <!-- Current Workout -->
  <section class="section">
    {#if data.activePlan}
      <div class="card">
        <div class="card-body d-flex justify-content-between align-items-center">
          <div>
            <p class="card-label">Current Workout</p>
            <p class="card-title">{data.activePlan.name}</p>
          </div>
          <a href="/plan" class="btn btn-light btn-sm fw-semibold">Continue</a>
        </div>
      </div>
    {:else}
      <div class="card">
        <div class="card-body">
          <p class="card-label">Current Workout</p>
          <p class="text-secondary">No active plan yet.</p>
          <a href="/plan" class="btn btn-light btn-sm mt-2">Create Plan</a>
        </div>
      </div>
    {/if}
  </section>

  <!-- My Plans -->
  <section class="section">
    <div class="card">
      <div class="card-body">
        <p class="card-label">My Plans</p>
        {#each data.plans as plan}
          <a href="/plans/{plan._id}" class="plan-row">
            <div>
              <span class="plan-date">{new Date(plan.createdAt).toLocaleDateString('en-CA')}</span>
              <span class="plan-name">{plan.name}</span>
            </div>
            <span class="arrow">›</span>
          </a>
        {/each}
        {#if data.plans.length === 0}
          <p class="text-secondary">No plans yet.</p>
        {/if}
        <a href="/plans" class="view-all">View all</a>
      </div>
    </div>
  </section>

  <!-- Categories -->
  <section class="section">
    <h3 class="section-title">Categories</h3>
    <div class="categories-scroll">
      {#each data.categories as cat}
        <a href="/categories/{cat.slug}" class="cat-tile" style="border-color: {cat.color};">
          <span class="cat-icon">{cat.icon}</span>
          <span class="cat-name" style="color: {cat.color};">{cat.name}</span>
        </a>
      {/each}
    </div>
  </section>

  <!-- Explore -->
  <section class="section">
    <h3 class="section-title">Explore</h3>
    <div class="explore-grid">
      {#each data.explore as ex}
        <a href="/exercises/{ex._id}" class="explore-card">
          {#if ex.imageUrl}
            <img src={ex.imageUrl} alt={ex.name} class="explore-img" />
          {:else}
            <div class="explore-placeholder"></div>
          {/if}
          <span class="explore-name">{ex.name}</span>
        </a>
      {/each}
    </div>
  </section>

</div>

<style>
  .page {
    padding: 16px;
  }

  .section {
    margin-bottom: 20px;
  }

  /* Greeting */
  .greeting {
    font-size: 1.6rem;
    font-weight: 700;
    color: #fff;
    margin-bottom: 12px;
  }

  /* Search */
  .search-bar {
    display: flex;
    align-items: center;
    background: #2A2A2A;
    border-radius: 12px;
    padding: 10px 14px;
    gap: 10px;
  }
  .search-icon {
    font-size: 1rem;
    opacity: 0.5;
  }
  .search-input {
    background: transparent;
    border: none;
    outline: none;
    color: #fff;
    width: 100%;
    font-size: 0.95rem;
  }
  .search-input::placeholder {
    color: #666;
  }

  /* Card */
  .card {
    background: #2A2A2A;
    border: none;
    border-radius: 14px;
  }
  .card-body {
    padding: 16px;
  }
  .card-label {
    font-size: 0.75rem;
    color: #888;
    margin-bottom: 2px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .card-title {
    font-size: 1rem;
    font-weight: 600;
    color: #fff;
    margin: 0;
  }

  /* Plans list */
  .plan-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #333;
    text-decoration: none;
    color: inherit;
  }
  .plan-row:last-of-type {
    border-bottom: none;
  }
  .plan-date {
    display: block;
    font-size: 0.72rem;
    color: #888;
  }
  .plan-name {
    font-size: 0.95rem;
    color: #fff;
    font-weight: 500;
  }
  .arrow {
    color: #555;
    font-size: 1.2rem;
  }
  .view-all {
    display: block;
    text-align: center;
    color: #888;
    font-size: 0.85rem;
    margin-top: 10px;
    text-decoration: none;
  }

  /* Section title */
  .section-title {
    font-size: 1.1rem;
    font-weight: 700;
    color: #fff;
    margin-bottom: 12px;
  }

  /* Categories grid */
  .categories-scroll {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 8px;
  }
  .cat-tile {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
    background: #2A2A2A;
    border: 1.5px solid;
    border-radius: 12px;
    padding: 10px 4px;
    text-decoration: none;
    min-width: 0;
  }
  .cat-icon {
    font-size: 1.4rem;
    line-height: 1;
  }
  .cat-name {
    font-size: 0.58rem;
    font-weight: 600;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    padding: 0 2px;
  }

  /* Explore grid */
  .explore-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }
  .explore-card {
    position: relative;
    border-radius: 12px;
    overflow: hidden;
    aspect-ratio: 1;
    text-decoration: none;
    background: #2A2A2A;
    display: block;
  }
  .explore-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .explore-placeholder {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #2A2A2A, #3A3A3A);
  }
  .explore-name {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 4px 6px;
    background: linear-gradient(transparent, rgba(0,0,0,0.75));
    color: #fff;
    font-size: 0.65rem;
    font-weight: 600;
  }
</style>

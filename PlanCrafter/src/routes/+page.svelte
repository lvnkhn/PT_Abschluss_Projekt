<script>
  import { goto } from '$app/navigation';
  let { data } = $props();

  let homeSearch = $state('');
  let showSuggestions = $state(false);

  // Search suggestions from layout data (inherited via $page.data is not available here,
  // but layout passes searchData via data prop if needed — we use inline filter)
  function handleSearch(e) {
    e.preventDefault();
    if (homeSearch.trim()) {
      goto(`/exercises?q=${encodeURIComponent(homeSearch.trim())}`);
    }
  }

  // Carousel
  let currentSlide = $state(0);
  const slides = $derived(data.carouselSlides ?? []);

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
  }

  // Touch swipe
  let touchStartX = 0;
  function onTouchStart(e) { touchStartX = e.touches[0].clientX; }
  function onTouchEnd(e) {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (dx > 50) prevSlide();
    else if (dx < -50) nextSlide();
  }
</script>

<div class="page">

  <!-- Greeting + Search -->
  <section class="section">
    <h2 class="greeting">Hi {data.username ?? 'User'} 👋</h2>
    <form class="search-bar" onsubmit={handleSearch}>
      <span class="search-icon">🔍</span>
      <input
        type="text"
        bind:value={homeSearch}
        placeholder="Übungen oder Kategorien suchen…"
        class="search-input"
        autocomplete="off"
      />
    </form>
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
          <a href="/plan" class="btn btn-sm fw-semibold btn-continue">Continue</a>
        </div>
      </div>
    {:else}
      <div class="card">
        <div class="card-body">
          <p class="card-label">Current Workout</p>
          <p class="no-plan">Kein aktiver Plan.</p>
          <a href="/plans" class="btn btn-sm mt-2 btn-continue">Plan erstellen</a>
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
          <p class="text-secondary" style="font-size:0.85rem">Noch keine Pläne.</p>
        {/if}
        <a href="/plans" class="view-all">View all →</a>
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

  <!-- Recommendations -->
  {#if data.recommended.length > 0}
    <section class="section">
      <h3 class="section-title">Für dich empfohlen</h3>
      <div class="explore-grid">
        {#each data.recommended as ex}
          <a href="/exercises/{ex._id}" class="explore-card">
            {#if ex.imageUrl}
              <img src={ex.imageUrl} alt={ex.name} class="explore-img" loading="lazy" />
            {:else}
              <div class="explore-placeholder"></div>
            {/if}
            <span class="explore-name">{ex.name}</span>
          </a>
        {/each}
      </div>
    </section>
  {/if}

  <!-- Explore Carousel -->
  {#if slides.length > 0}
    <section class="section">
      <div class="carousel-header">
        <h3 class="section-title">Explore</h3>
        <div class="carousel-dots">
          {#each slides as _, i}
            <button
              class="dot"
              class:active={i === currentSlide}
              onclick={() => currentSlide = i}
              aria-label="Slide {i + 1}"
            ></button>
          {/each}
        </div>
      </div>

      <div
        class="carousel-track"
        ontouchstart={onTouchStart}
        ontouchend={onTouchEnd}
      >
        <div class="carousel-viewport">
          <div class="carousel-slides" style="transform: translateX(-{currentSlide * 100}%)">
            {#each slides as slide}
              <div class="carousel-slide">
                <div class="explore-grid">
                  {#each slide as ex}
                    <a href="/exercises/{ex._id}" class="explore-card">
                      {#if ex.imageUrl}
                        <img src={ex.imageUrl} alt={ex.name} class="explore-img" loading="lazy" />
                      {:else}
                        <div class="explore-placeholder"></div>
                      {/if}
                      <span class="explore-name">{ex.name}</span>
                    </a>
                  {/each}
                </div>
              </div>
            {/each}
          </div>
        </div>

        <button class="carousel-btn carousel-prev" onclick={prevSlide} aria-label="Zurück">‹</button>
        <button class="carousel-btn carousel-next" onclick={nextSlide} aria-label="Weiter">›</button>
      </div>
    </section>
  {/if}

</div>

<style>
  .page { padding: 16px; }

  .section { margin-bottom: 20px; }

  .greeting {
    font-size: 1.6rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 12px;
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
    background: transparent;
    border: none;
    outline: none;
    color: var(--text-primary);
    width: 100%;
    font-size: 0.95rem;
  }
  .search-input::placeholder { color: var(--text-secondary); }

  .card { background: var(--bg-card); border: none; border-radius: 14px; }
  .card-body { padding: 16px; }
  .card-label {
    font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 4px;
    text-transform: uppercase; letter-spacing: 0.5px;
  }
  .card-title { font-size: 1rem; font-weight: 600; color: var(--text-primary); margin: 0; }
  .no-plan { color: var(--text-secondary); font-size: 0.85rem; margin: 0; }

  .btn-continue {
    background: var(--btn-primary-bg);
    color: var(--btn-primary-color);
    border: none;
    border-radius: 10px;
    padding: 6px 14px;
    font-weight: 600;
    text-decoration: none;
    font-size: 0.85rem;
  }

  .plan-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid var(--border-1);
    text-decoration: none;
    color: inherit;
  }
  .plan-row:last-of-type { border-bottom: none; }
  .plan-date { display: block; font-size: 0.72rem; color: var(--text-secondary); }
  .plan-name { font-size: 0.95rem; color: var(--text-primary); font-weight: 500; }
  .arrow { color: var(--text-secondary); font-size: 1.2rem; }
  .view-all {
    display: block; text-align: center; color: var(--text-secondary);
    font-size: 0.85rem; margin-top: 10px; text-decoration: none;
  }

  .section-title {
    font-size: 1.1rem; font-weight: 700; color: var(--text-primary); margin-bottom: 12px;
  }

  /* Categories */
  .categories-scroll {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 6px;
  }
  @media (max-width: 480px) {
    .categories-scroll {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  .cat-tile {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
    background: var(--bg-card);
    border: 1.5px solid;
    border-radius: 12px;
    padding: 10px 4px;
    text-decoration: none;
    min-width: 0;
  }
  .cat-icon { font-size: 1.4rem; line-height: 1; }
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

  /* Explore grid (2 rows × 4 cols) */
  .explore-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
  }
  @media (max-width: 360px) {
    .explore-grid { grid-template-columns: repeat(3, 1fr); }
  }

  .explore-card {
    position: relative;
    border-radius: 12px;
    overflow: hidden;
    aspect-ratio: 1;
    text-decoration: none;
    background: var(--bg-card);
    display: block;
  }
  .explore-img {
    width: 100%; height: 100%; object-fit: cover;
  }
  .explore-placeholder {
    width: 100%; height: 100%;
    background: var(--placeholder-gradient);
  }
  .explore-name {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    padding: 4px 6px;
    background: linear-gradient(transparent, rgba(0,0,0,0.75));
    color: #fff;
    font-size: 0.6rem;
    font-weight: 600;
    line-height: 1.3;
  }

  /* Carousel */
  .carousel-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
  }
  .carousel-header .section-title { margin-bottom: 0; }

  .carousel-dots {
    display: flex;
    gap: 6px;
    align-items: center;
  }

  .dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: var(--border-2);
    border: none;
    cursor: pointer;
    padding: 0;
    transition: background 0.2s, width 0.2s;
  }
  .dot.active {
    background: #14B8A6;
    width: 20px;
    border-radius: 4px;
  }

  .carousel-track {
    position: relative;
  }

  .carousel-viewport {
    overflow: hidden;
    border-radius: 14px;
  }

  .carousel-slides {
    display: flex;
    transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .carousel-slide {
    min-width: 100%;
  }

  .carousel-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 32px; height: 32px;
    background: rgba(0,0,0,0.55);
    color: #fff;
    border: none;
    border-radius: 50%;
    font-size: 1.4rem;
    line-height: 1;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    transition: background 0.15s;
  }
  .carousel-btn:hover { background: rgba(0,0,0,0.75); }
  .carousel-prev { left: 6px; }
  .carousel-next { right: 6px; }

  @media (max-width: 480px) {
    .carousel-btn { display: none; }
  }
</style>

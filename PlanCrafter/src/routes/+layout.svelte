<svelte:head>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
    integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
    crossorigin="anonymous"
  />
</svelte:head>

<script>
  import '../app.css';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { browser } from '$app/environment';
  import { toast } from '$lib/toast.svelte.js';

  let { children, data } = $props();

  const tabs = [
    { label: 'Home',       href: '/',             icon: '🏠' },
    { label: 'Exercises',  href: '/exercises',    icon: '🏋️' },
    { label: 'Your Plan',  href: '/plan',          icon: '📋' },
    { label: 'Categories', href: '/categories',   icon: '📦' },
    { label: 'Add',        href: '/add-exercise',  icon: '➕' },
  ];

  function isActive(href) {
    const path = $page.url.pathname;
    if (href === '/') return path === '/';
    return path.startsWith(href);
  }

  // Search
  let showSearch = $state(false);
  let searchValue = $state('');
  let showSuggestions = $state(false);

  const suggestions = $derived(() => {
    const q = searchValue.trim().toLowerCase();
    if (!q || q.length < 1) return [];
    const results = [];
    const exercises = data.searchData?.exercises ?? [];
    const categories = data.searchData?.categories ?? [];

    categories.filter(c => c.name.toLowerCase().includes(q)).slice(0, 3).forEach(c => {
      results.push({ type: 'category', label: c.name, href: `/categories/${c.slug}`, icon: '📦' });
    });
    exercises.filter(e => e.name.toLowerCase().includes(q)).slice(0, 6).forEach(e => {
      results.push({ type: 'exercise', label: e.name, href: `/exercises/${e.id}`, icon: '🏋️' });
    });
    return results.slice(0, 8);
  });

  function handleSearch(e) {
    e.preventDefault();
    if (searchValue.trim()) {
      goto(`/exercises?q=${encodeURIComponent(searchValue.trim())}`);
    }
    showSearch = false;
    showSuggestions = false;
    searchValue = '';
  }

  function openSearch() {
    showSearch = true;
    showSuggestions = false;
  }

  function closeSearch() {
    showSearch = false;
    showSuggestions = false;
    searchValue = '';
  }

  function onSearchInput() {
    showSuggestions = searchValue.trim().length > 0;
  }

  function selectSuggestion(href) {
    closeSearch();
    goto(href);
  }

  // Dark / Light mode
  let isDark = $state(true);

  if (browser) {
    isDark = localStorage.getItem('theme') !== 'light';
  }

  function toggleTheme() {
    isDark = !isDark;
    if (browser) {
      if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
      }
    }
  }
</script>

<header>
  <div class="topbar">
    {#if showSearch}
      <form class="search-topbar" onsubmit={handleSearch}>
        <span class="search-topbar-icon">🔍</span>
        <!-- svelte-ignore a11y_autofocus -->
        <input
          type="text"
          bind:value={searchValue}
          oninput={onSearchInput}
          placeholder="Übungen oder Kategorien suchen…"
          class="search-topbar-input"
          autofocus
          autocomplete="off"
        />
        <button type="button" class="close-btn" onclick={closeSearch}>✕</button>
      </form>
      {#if showSuggestions && suggestions().length > 0}
        <div class="suggestions-dropdown">
          {#each suggestions() as s}
            <button type="button" class="suggestion-item" onclick={() => selectSuggestion(s.href)}>
              <span class="suggestion-icon">{s.icon}</span>
              <span class="suggestion-label">{s.label}</span>
              <span class="suggestion-type">{s.type === 'category' ? 'Kategorie' : 'Übung'}</span>
            </button>
          {/each}
        </div>
      {/if}
    {:else}
      <a href="/" class="app-name">PlanCrafter</a>
      <div class="topbar-icons">
        <button class="icon-btn" onclick={openSearch} title="Suchen" aria-label="Suchen">🔍</button>
        <button
          class="theme-toggle"
          onclick={toggleTheme}
          title={isDark ? 'Helles Design' : 'Dunkles Design'}
          aria-label="Theme wechseln"
        >
          {isDark ? '☀️' : '🌙'}
        </button>
        {#if data.username}
          <a href="/profile" class="icon-btn" title="Profil" aria-label="Profil">👤</a>
        {:else}
          <a href="/login" class="icon-btn login-link" title="Anmelden">Anmelden</a>
        {/if}
      </div>
    {/if}
  </div>
  <div class="category-gradient"></div>
</header>

<main>
  {@render children()}
</main>

{#if toast.message}
  <div class="toast-notification">
    <span class="toast-check">✓</span>
    <div class="toast-body">
      <p class="toast-name">{toast.message}</p>
      <a href="/plan" class="toast-link" onclick={() => toast.dismiss()}>Zum Plan →</a>
    </div>
    <button class="toast-close" onclick={() => toast.dismiss()}>✕</button>
  </div>
{/if}

<nav class="bottom-nav">
  {#each tabs as tab}
    <a href={tab.href} class="tab" class:active={isActive(tab.href)}>
      <span class="tab-icon">{tab.icon}</span>
      <span class="tab-label">{tab.label}</span>
    </a>
  {/each}
</nav>

<style>
  .topbar {
    background: var(--topbar-bg);
    color: var(--text-primary);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    min-height: 52px;
    position: relative;
  }

  .app-name {
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--text-primary);
    text-decoration: none;
  }

  .topbar-icons {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .icon-btn {
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    color: var(--text-primary);
    padding: 0;
    text-decoration: none;
    line-height: 1;
  }

  .login-link {
    font-size: 0.82rem;
    font-weight: 600;
    color: #14B8A6;
    background: #14B8A615;
    border: 1px solid #14B8A6;
    border-radius: 20px;
    padding: 4px 12px;
  }

  .theme-toggle {
    background: none;
    border: none;
    font-size: 1.1rem;
    cursor: pointer;
    padding: 4px;
    border-radius: 8px;
    line-height: 1;
    transition: background 0.15s;
  }
  .theme-toggle:hover {
    background: var(--border-1);
  }

  /* Search in topbar */
  .search-topbar {
    display: flex;
    align-items: center;
    flex: 1;
    gap: 10px;
  }

  .search-topbar-icon {
    font-size: 1rem;
    opacity: 0.6;
    flex-shrink: 0;
  }

  .search-topbar-input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    color: var(--text-primary);
    font-size: 1rem;
  }

  .search-topbar-input::placeholder {
    color: var(--text-secondary);
  }

  .close-btn {
    background: none;
    border: none;
    color: var(--text-secondary);
    font-size: 0.9rem;
    cursor: pointer;
    flex-shrink: 0;
    padding: 0;
  }

  /* Suggestions dropdown */
  .suggestions-dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--bg-card);
    border-bottom: 1px solid var(--border-1);
    z-index: 2000;
    display: flex;
    flex-direction: column;
    box-shadow: 0 8px 24px var(--shadow);
  }

  .suggestion-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 16px;
    background: none;
    border: none;
    border-bottom: 1px solid var(--border-1);
    cursor: pointer;
    text-align: left;
    color: var(--text-primary);
    width: 100%;
    transition: background 0.1s;
  }
  .suggestion-item:last-child { border-bottom: none; }
  .suggestion-item:hover { background: var(--bg-card-alt); }

  .suggestion-icon { font-size: 1rem; flex-shrink: 0; }

  .suggestion-label {
    flex: 1;
    font-size: 0.9rem;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .suggestion-type {
    font-size: 0.72rem;
    color: var(--text-secondary);
    flex-shrink: 0;
  }

  .category-gradient {
    height: 3px;
    background: linear-gradient(
      to right,
      #14B8A6,
      #A855F7,
      #F97316,
      #EF4444,
      #3B82F6,
      #EAB308,
      #22C55E
    );
  }

  main {
    padding-bottom: 80px;
    overflow-y: auto;
  }

  .bottom-nav {
    position: fixed;
    bottom: 0;
    width: 100%;
    background: var(--bg-navbar);
    border-top: 1px solid var(--border-1);
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 64px;
    z-index: 1000;
  }

  .tab {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    color: var(--text-secondary);
    flex: 1;
    padding: 8px 0;
    gap: 2px;
  }

  .tab.active {
    color: var(--text-primary);
  }

  .tab-icon {
    font-size: 1.3rem;
    line-height: 1;
  }

  .tab-label {
    font-size: 0.65rem;
  }

  .toast-notification {
    position: fixed;
    top: 70px;
    right: 16px;
    z-index: 2000;
    background: var(--bg-card);
    border: 1px solid #14B8A6;
    border-radius: 14px;
    padding: 14px 16px;
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 210px;
    max-width: 280px;
    animation: toast-in 0.25s ease;
  }

  @keyframes toast-in {
    from { transform: translateX(110%); opacity: 0; }
    to   { transform: translateX(0);    opacity: 1; }
  }

  .toast-check {
    color: #14B8A6;
    font-size: 1.1rem;
    font-weight: 700;
    flex-shrink: 0;
  }

  .toast-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  .toast-name {
    color: var(--text-primary);
    font-size: 0.85rem;
    font-weight: 600;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .toast-link {
    color: #14B8A6;
    font-size: 0.78rem;
    text-decoration: none;
    font-weight: 500;
  }

  .toast-close {
    background: none;
    border: none;
    color: var(--text-secondary);
    font-size: 0.85rem;
    cursor: pointer;
    padding: 0;
    flex-shrink: 0;
  }

  @media (max-width: 480px) {
    .tab-label { display: none; }
    .tab { padding: 10px 0; }
    .tab-icon { font-size: 1.5rem; }
  }
</style>

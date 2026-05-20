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

  let showSearch = $state(false);
  let searchValue = $state('');

  function handleSearch(e) {
    e.preventDefault();
    if (searchValue.trim()) {
      goto(`/exercises?q=${encodeURIComponent(searchValue.trim())}`);
    }
    showSearch = false;
    searchValue = '';
  }

  function openSearch() {
    showSearch = true;
  }

  function closeSearch() {
    showSearch = false;
    searchValue = '';
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
          placeholder="Übungen suchen…"
          class="search-topbar-input"
          autofocus
        />
        <button type="button" class="close-btn" onclick={closeSearch}>✕</button>
      </form>
    {:else}
      <a href="/" class="app-name">PlanCrafter</a>
      <div class="topbar-icons">
        <button class="icon-btn" onclick={openSearch} title="Suchen">🔍</button>
        {#if data.username}
          <div class="user-menu">
            <span class="username-chip">{data.username}</span>
            <form method="POST" action="/logout">
              <button type="submit" class="icon-btn logout-btn" title="Abmelden">👤</button>
            </form>
          </div>
        {:else}
          <a href="/login" class="icon-btn" title="Anmelden">👤</a>
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
    background: #1A1A1A;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    min-height: 52px;
  }

  .app-name {
    font-size: 1.2rem;
    font-weight: 700;
    color: #fff;
    text-decoration: none;
  }

  .topbar-icons {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 1.2rem;
  }

  .icon-btn {
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    color: #fff;
    padding: 0;
    text-decoration: none;
    line-height: 1;
  }

  .user-menu {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .username-chip {
    font-size: 0.78rem;
    font-weight: 600;
    color: #14B8A6;
    background: #14B8A615;
    border: 1px solid #14B8A6;
    border-radius: 20px;
    padding: 3px 10px;
  }

  .logout-btn {
    opacity: 0.6;
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
    color: #fff;
    font-size: 1rem;
  }

  .search-topbar-input::placeholder {
    color: #666;
  }

  .close-btn {
    background: none;
    border: none;
    color: #888;
    font-size: 0.9rem;
    cursor: pointer;
    flex-shrink: 0;
    padding: 0;
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
    background: #111;
    border-top: 1px solid #333;
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
    color: #888;
    flex: 1;
    padding: 8px 0;
    gap: 2px;
  }

  .tab.active {
    color: #fff;
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
    background: #2A2A2A;
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
    color: #fff;
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
    color: #666;
    font-size: 0.85rem;
    cursor: pointer;
    padding: 0;
    flex-shrink: 0;
  }
</style>

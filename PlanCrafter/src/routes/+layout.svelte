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

  let { children } = $props();

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
</script>

<header>
  <div class="topbar">
    <span class="app-name">PlanCrafter</span>
    <div class="topbar-icons">
      <span>🔍</span>
      <span>👤</span>
    </div>
  </div>
  <div class="category-gradient"></div>
</header>

<main>
  {@render children()}
</main>

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
  }

  .app-name {
    font-size: 1.2rem;
    font-weight: 700;
  }

  .topbar-icons {
    display: flex;
    gap: 16px;
    font-size: 1.2rem;
    cursor: pointer;
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
      #22C55E,
      #EC4899
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
</style>

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
  import { toast } from '$lib/toast.svelte.js';

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
    <a href="/" class="app-name">PlanCrafter</a>
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
  }

  .app-name {
    font-size: 1.2rem;
    font-weight: 700;
    color: #fff;
    text-decoration: none;
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

<script>
  import { enhance } from '$app/forms';
  let { data } = $props();
  const plan = data.plan;
</script>

<div class="page">

  <button onclick={() => history.back()} class="back-btn">
    <span class="back-arrow">‹</span> My Plans
  </button>

  <div class="header">
    <h2 class="title">{plan.name}</h2>
    <p class="meta">
      {plan.exercises.length} Übungen ·
      {#if plan.lastCompletedAt}
        Zuletzt abgeschlossen: {new Date(plan.lastCompletedAt).toLocaleDateString('de-CH')}
      {:else}
        Erstellt: {new Date(plan.createdAt).toLocaleDateString('de-CH')}
      {/if}
    </p>
  </div>

  {#if plan.status === 'completed'}
    <form method="POST" action="?/restart" use:enhance>
      <button type="submit" class="btn-start">Jetzt starten</button>
    </form>
  {/if}

  <div class="exercise-list">
    {#each plan.exercises as ex}
      <div class="ex-card" class:done={ex.done}>
        {#if ex.imageUrl}
          <img src={ex.imageUrl} alt={ex.name} class="ex-img" />
        {:else}
          <div class="ex-img ex-placeholder"></div>
        {/if}
        <span class="ex-name">{ex.name}</span>
        {#if ex.done}
          <span class="check-icon">✓</span>
        {/if}
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
    background: none;
    border: none;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    padding: 0;
  }
  .back-arrow {
    font-size: 1.4rem;
    line-height: 1;
  }

  .header {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .title {
    font-size: 1.4rem;
    font-weight: 700;
    color: #fff;
    margin: 0;
  }

  .meta {
    font-size: 0.8rem;
    color: #888;
    margin: 0;
  }

  .btn-start {
    width: 100%;
    padding: 14px;
    background: #fff;
    color: #111;
    border: none;
    border-radius: 14px;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
  }

  .exercise-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .ex-card {
    display: flex;
    align-items: center;
    gap: 12px;
    background: #2A2A2A;
    border-radius: 14px;
    padding: 12px;
    opacity: 1;
    transition: opacity 0.2s;
  }
  .ex-card.done {
    opacity: 0.5;
  }

  .ex-img {
    width: 56px;
    height: 56px;
    border-radius: 10px;
    object-fit: cover;
    flex-shrink: 0;
  }
  .ex-placeholder {
    background: linear-gradient(135deg, #333, #444);
  }

  .ex-name {
    flex: 1;
    font-size: 0.95rem;
    font-weight: 600;
    color: #fff;
  }

  .check-icon {
    color: #14B8A6;
    font-size: 1rem;
    font-weight: 700;
  }
</style>

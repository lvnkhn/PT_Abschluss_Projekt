<script>
  let { data } = $props();
</script>

<div class="page">

  <h2 class="title">My Plans</h2>

  {#if data.plans.length === 0}
    <div class="empty">
      <p>Noch keine Pläne gespeichert.</p>
      <a href="/exercises">Übungen hinzufügen →</a>
    </div>
  {:else}
    <div class="plan-list">
      {#each data.plans as plan}
        <a href="/plans/{plan._id}" class="plan-row">
          <div class="plan-info">
            <p class="plan-name">{plan.name}</p>
            <p class="plan-meta">
              {plan.exercises.length} Übungen ·
              {#if plan.lastCompletedAt}
                Zuletzt: {new Date(plan.lastCompletedAt).toLocaleDateString('de-CH')}
              {:else}
                {new Date(plan.createdAt).toLocaleDateString('de-CH')}
              {/if}
            </p>
          </div>
          <div class="plan-right">
            {#if plan.status === 'active'}
              <span class="badge-active">Aktiv</span>
            {:else}
              <span class="badge-done">✓</span>
            {/if}
            <span class="arrow">›</span>
          </div>
        </a>
      {/each}
    </div>
  {/if}

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

  .plan-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .plan-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #2A2A2A;
    border-radius: 14px;
    padding: 16px;
    text-decoration: none;
  }

  .plan-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .plan-name {
    font-size: 1rem;
    font-weight: 600;
    color: #fff;
    margin: 0;
  }

  .plan-meta {
    font-size: 0.78rem;
    color: #888;
    margin: 0;
  }

  .plan-right {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .badge-active {
    font-size: 0.7rem;
    font-weight: 600;
    padding: 3px 10px;
    border-radius: 20px;
    background: #14B8A620;
    color: #14B8A6;
    border: 1px solid #14B8A6;
  }

  .badge-done {
    font-size: 0.85rem;
    color: #14B8A6;
  }

  .arrow {
    color: #555;
    font-size: 1.4rem;
  }

  .empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    margin-top: 60px;
    color: #666;
    font-size: 0.9rem;
  }
  .empty a {
    color: #14B8A6;
    text-decoration: none;
  }
</style>

<script>
  import { enhance } from '$app/forms';
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
        <div class="plan-card">
          <a href="/plans/{plan._id}" class="plan-info">
            <div class="plan-header">
              <p class="plan-name">{plan.name}</p>
              {#if plan.status === 'active'}
                <span class="badge-active">Aktiv</span>
              {:else}
                <span class="badge-done">✓</span>
              {/if}
            </div>
            <p class="plan-meta">
              {plan.exercises.length} Übungen ·
              {#if plan.lastCompletedAt}
                Zuletzt: {new Date(plan.lastCompletedAt).toLocaleDateString('de-CH')}
              {:else}
                {new Date(plan.createdAt).toLocaleDateString('de-CH')}
              {/if}
            </p>
          </a>
          <div class="plan-actions">
            <a href="/plans/{plan._id}/edit" class="action-btn edit-btn" title="Bearbeiten">✏</a>
            <form method="POST" action="?/activate" use:enhance={() => {
              return async ({ update }) => { await update({ reset: false }); };
            }}>
              <input type="hidden" name="planId" value={plan._id} />
              <button type="submit" class="action-btn start-btn" title="Starten">▶</button>
            </form>
          </div>
        </div>
      {/each}
    </div>
  {/if}

</div>

<style>
  .page { padding: 16px; }

  .title {
    font-size: 1.6rem;
    font-weight: 700;
    color: #fff;
    margin-bottom: 16px;
  }

  .plan-list { display: flex; flex-direction: column; gap: 10px; }

  .plan-card {
    display: flex;
    align-items: center;
    background: #2A2A2A;
    border-radius: 14px;
    padding: 14px 12px 14px 16px;
    gap: 12px;
  }

  .plan-info {
    flex: 1;
    text-decoration: none;
    min-width: 0;
  }

  .plan-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 4px;
  }

  .plan-name {
    font-size: 1rem;
    font-weight: 600;
    color: #fff;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .plan-meta {
    font-size: 0.78rem;
    color: #888;
    margin: 0;
  }

  .badge-active {
    font-size: 0.68rem;
    font-weight: 600;
    padding: 2px 8px;
    border-radius: 20px;
    background: #14B8A620;
    color: #14B8A6;
    border: 1px solid #14B8A6;
    flex-shrink: 0;
  }

  .badge-done {
    font-size: 0.85rem;
    color: #14B8A6;
    flex-shrink: 0;
  }

  .plan-actions {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
  }

  .action-btn {
    width: 38px;
    height: 38px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.95rem;
    cursor: pointer;
    text-decoration: none;
    border: none;
    flex-shrink: 0;
  }

  .edit-btn {
    background: #333;
    color: #aaa;
  }

  .start-btn {
    background: #14B8A6;
    color: #fff;
    font-size: 0.8rem;
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
  .empty a { color: #14B8A6; text-decoration: none; }
</style>

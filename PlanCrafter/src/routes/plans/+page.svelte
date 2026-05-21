<script>
  import { enhance } from '$app/forms';
  import { i18n } from '$lib/i18n.svelte.js';
  let { data } = $props();

  function fmtTime(ms) {
    const h = Math.floor(ms / 3600000).toString().padStart(2, '0');
    const m = Math.floor((ms % 3600000) / 60000).toString().padStart(2, '0');
    const s = Math.floor((ms % 60000) / 1000).toString().padStart(2, '0');
    const cs = Math.floor((ms % 1000) / 10).toString().padStart(2, '0');
    return `${h}:${m}:${s}.${cs}`;
  }
</script>

<div class="page">

  <!-- Top half: Create Plan -->
  <div class="create-section">
    <h2 class="title">{i18n.t('Pläne', 'Plans')}</h2>
    <p class="create-desc">{i18n.t('Stelle dir aus deinen Übungen einen neuen Trainingsplan zusammen.', 'Build a new training plan from your exercises.')}</p>
    <a href="/exercises" class="btn-create">
      <span class="btn-icon">➕</span>
      {i18n.t('Neuen Plan erstellen', 'Create new plan')}
    </a>
  </div>

  <div class="divider"></div>

  <!-- Bottom half: My Plans -->
  <div class="plans-section">
    <h3 class="section-title">{i18n.t('Meine Pläne', 'My Plans')}</h3>

    {#if data.plans.length === 0}
      <div class="empty">
        <p>{i18n.t('Noch keine Pläne gespeichert.', 'No plans saved yet.')}</p>
        <a href="/exercises" class="empty-link">{i18n.t('Übungen hinzufügen →', 'Add exercises →')}</a>
      </div>
    {:else}
      <div class="plan-list">
        {#each data.plans as plan}
          <div class="plan-card">
            <a href="/plans/{plan._id}" class="plan-info">
              <div class="plan-header">
                <p class="plan-name">{plan.name}</p>
                {#if plan.status === 'active'}
                  <span class="badge-active">{i18n.t('Aktiv', 'Active')}</span>
                {:else}
                  <span class="badge-done">✓</span>
                {/if}
              </div>
              <p class="plan-meta">
                {plan.exercises.length} {i18n.t('Übungen', 'exercises')} ·
                {#if plan.lastCompletedAt}
                  {i18n.t('Zuletzt:', 'Last:')} {new Date(plan.lastCompletedAt).toLocaleDateString('de-CH')}
                {:else}
                  {new Date(plan.createdAt).toLocaleDateString('de-CH')}
                {/if}
                {#if plan.bestTimeMs}
                  · {i18n.t('Bestzeit:', 'Best time:')} {fmtTime(plan.bestTimeMs)}
                {/if}
              </p>
            </a>
            <div class="plan-actions">
              <a href="/plans/{plan._id}/edit" class="action-btn edit-btn" title={i18n.t('Bearbeiten', 'Edit')}>✏️</a>
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

</div>

<style>
  .page { padding: 16px; display: flex; flex-direction: column; gap: 0; }

  .create-section {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-bottom: 20px;
  }

  .title {
    font-size: 1.6rem;
    font-weight: 700;
    color: var(--text-primary);
    margin: 0;
  }

  .create-desc {
    font-size: 0.88rem;
    color: var(--text-secondary);
    margin: 0;
  }

  .btn-create {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 16px;
    background: #14B8A6;
    color: #fff;
    border-radius: 14px;
    font-size: 1rem;
    font-weight: 700;
    text-decoration: none;
    transition: background 0.2s;
  }
  .btn-create:hover { background: #0e9087; color: #fff; }
  .btn-icon { font-size: 1.2rem; }

  .divider {
    height: 1px;
    background: var(--border-1);
    margin: 8px 0 20px;
  }

  .plans-section { display: flex; flex-direction: column; gap: 14px; }

  .section-title {
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--text-primary);
    margin: 0;
  }

  .plan-list { display: flex; flex-direction: column; gap: 10px; }

  .plan-card {
    display: flex;
    align-items: center;
    background: var(--bg-card);
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
    color: var(--text-primary);
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .plan-meta {
    font-size: 0.78rem;
    color: var(--text-secondary);
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
    white-space: nowrap;
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
    font-size: 1rem;
    cursor: pointer;
    text-decoration: none;
    border: none;
    flex-shrink: 0;
  }

  .edit-btn {
    background: var(--bg-card-alt);
    color: var(--text-dim);
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
    margin-top: 20px;
    color: var(--text-secondary);
    font-size: 0.9rem;
    text-align: center;
  }
  .empty-link { color: #14B8A6; text-decoration: none; }
</style>

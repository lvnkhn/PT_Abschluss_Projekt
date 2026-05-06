<script>
  import { enhance } from '$app/forms';
  let { data } = $props();

  const plan      = $derived(data.plan);
  const isActive  = $derived(plan.status === 'active');
  const doneCount = $derived(plan.exercises.filter(e => e.done).length);
  const total     = $derived(plan.exercises.length);
</script>

<div class="page">

  <button onclick={() => history.back()} class="back-btn">
    <span class="back-arrow">‹</span> My Plans
  </button>

  <div class="header">
    <h2 class="title">{plan.name}</h2>
    <p class="meta">
      {total} Übungen ·
      {#if plan.lastCompletedAt}
        Zuletzt abgeschlossen: {new Date(plan.lastCompletedAt).toLocaleDateString('de-CH')}
      {:else}
        Erstellt: {new Date(plan.createdAt).toLocaleDateString('de-CH')}
      {/if}
    </p>
  </div>

  {#if plan.status === 'completed'}
    <form method="POST" action="?/restart" use:enhance={() => {
      return async ({ update }) => { await update({ reset: false }); };
    }}>
      <button type="submit" class="btn-start">Jetzt starten</button>
    </form>
  {/if}

  {#if isActive}
    <div>
      <p class="progress-label">{doneCount} / {total} erledigt</p>
      <div class="progress-bar">
        <div class="progress-fill" style="width: {total > 0 ? (doneCount / total) * 100 : 0}%"></div>
      </div>
    </div>
  {/if}

  <div class="exercise-list">
    {#each plan.exercises as ex}
      {#if isActive}
        <form method="POST" action="?/toggleDone" use:enhance={() => {
          return async ({ update }) => { await update({ reset: false }); };
        }} class="ex-card" class:done={ex.done}>
          <input type="hidden" name="exerciseId" value={ex.exerciseId} />
          <input type="hidden" name="done"       value={ex.done} />
          {#if ex.imageUrl}
            <img src={ex.imageUrl} alt={ex.name} class="ex-img" />
          {:else}
            <div class="ex-img ex-placeholder"></div>
          {/if}
          <span class="ex-name" class:done-text={ex.done}>{ex.name}</span>
          <button type="submit" class="check-btn" class:checked={ex.done}>
            {#if ex.done}✓{/if}
          </button>
        </form>
      {:else}
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
      {/if}
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
    display: flex; align-items: center; gap: 4px;
    color: #fff; background: none; border: none;
    font-size: 1rem; font-weight: 600; cursor: pointer; padding: 0;
  }
  .back-arrow { font-size: 1.4rem; line-height: 1; }

  .header { display: flex; flex-direction: column; gap: 4px; }
  .title { font-size: 1.4rem; font-weight: 700; color: #fff; margin: 0; }
  .meta { font-size: 0.8rem; color: #888; margin: 0; }

  .btn-start {
    width: 100%; padding: 14px;
    background: #fff; color: #111;
    border: none; border-radius: 14px;
    font-size: 1rem; font-weight: 700; cursor: pointer;
  }

  .progress-label { font-size: 0.85rem; color: #888; margin: 0 0 6px; }
  .progress-bar { height: 4px; background: #333; border-radius: 4px; overflow: hidden; }
  .progress-fill {
    height: 100%; background: #14B8A6;
    border-radius: 4px; transition: width 0.3s;
  }

  .exercise-list { display: flex; flex-direction: column; gap: 10px; }

  .ex-card {
    display: flex; align-items: center; gap: 12px;
    background: #2A2A2A; border-radius: 14px; padding: 12px;
    transition: opacity 0.2s;
    border: none; width: 100%; text-align: left; cursor: default;
  }
  form.ex-card { cursor: pointer; }
  .ex-card.done { opacity: 0.5; }

  .ex-img {
    width: 56px; height: 56px;
    border-radius: 10px; object-fit: cover; flex-shrink: 0;
  }
  .ex-placeholder { background: linear-gradient(135deg, #333, #444); }

  .ex-name { flex: 1; font-size: 0.95rem; font-weight: 600; color: #fff; }
  .done-text { text-decoration: line-through; color: #666; }

  .check-btn {
    width: 32px; height: 32px; border-radius: 50%;
    background: #333; color: #fff; border: 2px solid #444;
    font-size: 1rem; cursor: pointer; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.2s, border-color 0.2s;
  }
  .check-btn.checked { background: #14B8A6; border-color: #14B8A6; }

  .check-icon { color: #14B8A6; font-size: 1rem; font-weight: 700; }
</style>

<script>
  import { enhance } from '$app/forms';
  import { onDestroy } from 'svelte';
  let { data } = $props();

  const activePlan  = $derived(data.activePlan);
  const draft       = $derived(data.draft);
  const savedPlans  = $derived(data.savedPlans);
  const doneCount   = $derived(activePlan?.exercises.filter(e => e.done).length ?? 0);
  const totalCount  = $derived(activePlan?.exercises.length ?? 0);
  const draftCount  = $derived(draft?.exercises.length ?? 0);

  // Timer
  let seconds = $state(0);
  let timerRunning = $state(false);
  let timerInterval;

  function toggleTimer() {
    if (timerRunning) {
      clearInterval(timerInterval);
      timerRunning = false;
    } else {
      timerRunning = true;
      timerInterval = setInterval(() => { seconds++; }, 1000);
    }
  }

  function resetTimer() {
    clearInterval(timerInterval);
    timerRunning = false;
    seconds = 0;
  }

  function fmt(s) {
    const h = Math.floor(s / 3600).toString().padStart(2, '0');
    const m = Math.floor((s % 3600) / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${h}:${m}:${sec}`;
  }

  onDestroy(() => clearInterval(timerInterval));
</script>

<div class="page">

  <!-- ── Active workout ───────────────────────────── -->
  {#if activePlan}
    <h2 class="title">{activePlan.name}</h2>
    <p class="subtitle">{doneCount} / {totalCount} erledigt</p>

    <div class="progress-bar">
      <div class="progress-fill" style="width: {totalCount > 0 ? (doneCount / totalCount) * 100 : 0}%"></div>
    </div>

    <!-- Timer -->
    <div class="timer-card">
      <p class="timer-display">{fmt(seconds)}</p>
      <div class="timer-btns">
        <button onclick={toggleTimer} class="timer-btn" class:running={timerRunning}>
          {timerRunning ? '⏸ Pause' : '▶ Start'}
        </button>
        {#if seconds > 0}
          <button onclick={resetTimer} class="timer-reset">↺</button>
        {/if}
      </div>
    </div>

    <div class="exercise-list">
      {#each activePlan.exercises as ex}
        <form method="POST" action="?/toggleDone" use:enhance={() => {
          return async ({ update }) => { await update({ reset: false }); };
        }} class="ex-workout-card" class:done={ex.done}>
          <input type="hidden" name="planId"     value={activePlan._id} />
          <input type="hidden" name="exerciseId" value={ex.exerciseId} />
          <input type="hidden" name="done"       value={ex.done} />
          {#if ex.imageUrl}
            <img src={ex.imageUrl} alt={ex.name} class="ex-img" loading="lazy" />
          {:else}
            <div class="ex-img ex-placeholder"></div>
          {/if}
          <span class="ex-name" class:done-text={ex.done}>{ex.name}</span>
          <button type="submit" class="check-btn" class:checked={ex.done}>
            {#if ex.done}✓{/if}
          </button>
        </form>
      {/each}
    </div>

    <!-- Partial completion -->
    {#if totalCount > 0}
      <form method="POST" action="?/completePlan" use:enhance={() => {
        return async ({ update }) => { await update({ reset: false }); };
      }}>
        <input type="hidden" name="planId" value={activePlan._id} />
        <button type="submit" class="btn-complete">
          Training abschliessen ({doneCount}/{totalCount})
        </button>
      </form>
    {/if}

  {:else if !draft}
    <div class="empty">
      <p class="empty-title">Kein aktiver Plan</p>
      <p class="empty-sub">Erstelle einen neuen Plan oder starte einen gespeicherten.</p>
    </div>
  {/if}

  <!-- ── New plan button ───────────────────────────── -->
  {#if !draft}
    <a href="/exercises" class="btn-new-plan">+ Neuen Plan erstellen</a>
  {/if}

  <!-- ── Draft (plan being built) ─────────────────── -->
  {#if draft}
    <div class="draft-section" class:has-active={!!activePlan}>
      <h3 class="draft-title">Plan in Bearbeitung</h3>
      <p class="subtitle">{draftCount} Übung{draftCount !== 1 ? 'en' : ''} hinzugefügt</p>

      <div class="exercise-list">
        {#each draft.exercises as ex}
          <div class="ex-card">
            {#if ex.imageUrl}
              <img src={ex.imageUrl} alt={ex.name} class="ex-img" loading="lazy" />
            {:else}
              <div class="ex-img ex-placeholder"></div>
            {/if}
            <span class="ex-name">{ex.name}</span>
            <form method="POST" action="?/removeExercise" use:enhance={() => {
              return async ({ update }) => { await update({ reset: false }); };
            }}>
              <input type="hidden" name="planId"     value={draft._id} />
              <input type="hidden" name="exerciseId" value={ex.exerciseId} />
              <button type="submit" class="remove-btn">✕</button>
            </form>
          </div>
        {/each}
      </div>

      {#if draftCount > 0}
        <form method="POST" action="?/saveName" use:enhance={() => {
          return async ({ update }) => { await update({ reset: false }); };
        }} class="name-form">
          <input type="hidden" name="planId" value={draft._id} />
          <input type="text" name="name" placeholder="Plan benennen…" class="name-input" required />
          <button type="submit" class="btn-save">Speichern</button>
        </form>
      {/if}
    </div>
  {/if}

  <!-- ── Saved plans ───────────────────────────────── -->
  {#if savedPlans.length > 0}
    <div class="divider"></div>
    <h3 class="section-title">Meine Pläne</h3>
    <div class="saved-list">
      {#each savedPlans as p}
        <div class="plan-row">
          <a href="/plans/{p._id}" class="plan-info">
            <p class="plan-name">{p.name}</p>
            <p class="plan-meta">
              {p.exercises.length} Übungen ·
              {#if p.lastCompletedAt}
                Zuletzt: {new Date(p.lastCompletedAt).toLocaleDateString('de-CH')}
              {:else}
                {new Date(p.createdAt).toLocaleDateString('de-CH')}
              {/if}
            </p>
          </a>
          <div class="plan-actions">
            <a href="/plans/{p._id}/edit" class="action-btn edit-btn" title="Bearbeiten">✏</a>
            <form method="POST" action="?/activatePlan" use:enhance={() => {
              return async ({ update }) => { await update({ reset: false }); };
            }}>
              <input type="hidden" name="planId" value={p._id} />
              <button type="submit" class="action-btn start-btn" title="Starten">▶</button>
            </form>
          </div>
        </div>
      {/each}
    </div>
  {/if}

</div>

<style>
  .page {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .title { font-size: 1.6rem; font-weight: 700; color: #fff; margin: 0; }
  .subtitle { color: #888; font-size: 0.85rem; margin: 0; }

  .progress-bar { height: 4px; background: #333; border-radius: 4px; overflow: hidden; }
  .progress-fill {
    height: 100%; background: #14B8A6;
    border-radius: 4px; transition: width 0.3s;
  }

  /* Timer */
  .timer-card {
    background: #2A2A2A;
    border-radius: 14px;
    padding: 14px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  .timer-display {
    font-size: 1.5rem;
    font-weight: 700;
    color: #fff;
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.04em;
    margin: 0;
  }

  .timer-btns { display: flex; align-items: center; gap: 8px; }

  .timer-btn {
    padding: 8px 14px;
    background: #14B8A6; color: #fff;
    border: none; border-radius: 10px;
    font-size: 0.85rem; font-weight: 600; cursor: pointer;
    transition: background 0.2s;
  }
  .timer-btn.running { background: #0e9087; }

  .timer-reset {
    width: 32px; height: 32px;
    background: #333; color: #aaa;
    border: none; border-radius: 8px;
    font-size: 1rem; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
  }

  .exercise-list { display: flex; flex-direction: column; gap: 10px; }

  .ex-card {
    display: flex;
    align-items: center;
    gap: 12px;
    background: #2A2A2A;
    border-radius: 14px;
    padding: 12px;
  }

  .ex-workout-card {
    display: flex;
    align-items: center;
    gap: 12px;
    background: #2A2A2A;
    border-radius: 14px;
    padding: 12px;
    border: none;
    width: 100%;
    text-align: left;
    cursor: pointer;
    transition: opacity 0.2s;
  }
  .ex-workout-card.done { opacity: 0.5; }

  .ex-img {
    width: 56px; height: 56px;
    border-radius: 10px; object-fit: cover; flex-shrink: 0;
  }
  .ex-placeholder { background: linear-gradient(135deg, #333, #444); }

  .ex-name { flex: 1; font-size: 0.95rem; font-weight: 600; color: #fff; }
  .done-text { text-decoration: line-through; color: #666; }

  .remove-btn {
    width: 32px; height: 32px;
    border-radius: 8px;
    background: #3A3A3A; color: #888;
    border: none; font-size: 0.85rem; cursor: pointer; flex-shrink: 0;
  }

  .check-btn {
    width: 32px; height: 32px; border-radius: 50%;
    background: #333; color: #fff;
    border: 2px solid #444;
    font-size: 1rem; cursor: pointer; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.2s, border-color 0.2s;
  }
  .check-btn.checked { background: #14B8A6; border-color: #14B8A6; }

  .btn-complete {
    width: 100%;
    padding: 14px;
    background: #2A2A2A;
    color: #14B8A6;
    border: 1.5px solid #14B8A6;
    border-radius: 14px;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
  }

  .draft-section { display: flex; flex-direction: column; gap: 10px; }
  .draft-section.has-active {
    border-top: 1px solid #2A2A2A;
    padding-top: 14px;
  }
  .draft-title { font-size: 1rem; font-weight: 700; color: #fff; margin: 0; }

  .name-form { display: flex; gap: 10px; margin-top: 4px; }
  .name-input {
    flex: 1;
    background: #2A2A2A; border: 1px solid #444; border-radius: 12px;
    padding: 12px 14px; color: #fff; font-size: 0.95rem; outline: none;
  }
  .name-input::placeholder { color: #555; }
  .btn-save {
    padding: 12px 20px; background: #fff; color: #111;
    border: none; border-radius: 12px; font-weight: 700; font-size: 0.9rem; cursor: pointer;
  }

  .empty {
    display: flex; flex-direction: column; align-items: center;
    justify-content: center; gap: 10px; margin-top: 80px; text-align: center;
  }
  .empty-title { font-size: 1.1rem; font-weight: 700; color: #fff; margin: 0; }
  .empty-sub { color: #666; font-size: 0.85rem; margin: 0; }

  .btn-new-plan {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 14px;
    background: #2A2A2A;
    border: 1.5px dashed #444;
    border-radius: 14px;
    color: #aaa;
    font-size: 0.95rem;
    font-weight: 600;
    text-decoration: none;
    transition: border-color 0.2s, color 0.2s;
  }
  .btn-new-plan:hover { border-color: #14B8A6; color: #14B8A6; }

  .divider { height: 1px; background: #2A2A2A; margin: 4px 0; }
  .section-title { font-size: 1rem; font-weight: 700; color: #fff; margin: 0; }

  .saved-list { display: flex; flex-direction: column; gap: 10px; }

  .plan-row {
    display: flex; align-items: center;
    background: #2A2A2A; border-radius: 14px;
    padding: 14px 12px 14px 16px; gap: 10px;
  }
  .plan-info { flex: 1; text-decoration: none; min-width: 0; }
  .plan-name {
    font-size: 1rem; font-weight: 600; color: #fff; margin: 0;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .plan-meta { font-size: 0.78rem; color: #888; margin: 0; }

  .plan-actions { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }

  .action-btn {
    width: 36px; height: 36px; border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.9rem; cursor: pointer; text-decoration: none;
    border: none; flex-shrink: 0;
  }
  .edit-btn { background: #3A3A3A; color: #aaa; }
  .start-btn { background: #14B8A6; color: #fff; font-size: 0.78rem; }
</style>

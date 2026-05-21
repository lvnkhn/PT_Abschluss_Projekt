<script>
  import { enhance } from '$app/forms';
  import { onDestroy } from 'svelte';
  let { data } = $props();

  const plan      = $derived(data.plan);
  const isActive  = $derived(plan.status === 'active');
  const doneCount = $derived(plan.exercises.filter(e => e.done).length);
  const total     = $derived(plan.exercises.length);

  // Timer in centiseconds
  let cs = $state(0);
  let timerRunning = $state(false);
  let timerInterval;

  function toggleTimer() {
    if (timerRunning) {
      clearInterval(timerInterval);
      timerRunning = false;
    } else {
      timerRunning = true;
      timerInterval = setInterval(() => { cs++; }, 10);
    }
  }

  function resetTimer() {
    clearInterval(timerInterval);
    timerRunning = false;
    cs = 0;
  }

  function fmt(c) {
    const totalMs = c * 10;
    const h  = Math.floor(totalMs / 3600000).toString().padStart(2, '0');
    const m  = Math.floor((totalMs % 3600000) / 60000).toString().padStart(2, '0');
    const s  = Math.floor((totalMs % 60000) / 1000).toString().padStart(2, '0');
    const ms = Math.floor(totalMs % 1000 / 10).toString().padStart(2, '0');
    return `${h}:${m}:${s}.${ms}`;
  }

  function fmtMs(ms) {
    return fmt(ms / 10);
  }

  const elapsedMs = $derived(cs * 10);

  onDestroy(() => clearInterval(timerInterval));

  function submitForm(e) {
    if (!e.target.closest('button[type=submit]')) {
      const btn = e.currentTarget.querySelector('button[type=submit]');
      btn?.click();
    }
  }
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
        Zuletzt: {new Date(plan.lastCompletedAt).toLocaleDateString('de-CH')}
      {:else}
        Erstellt: {new Date(plan.createdAt).toLocaleDateString('de-CH')}
      {/if}
    </p>
    {#if plan.bestTimeMs}
      <p class="best-time">⏱ Bestzeit: {fmtMs(plan.bestTimeMs)}</p>
    {/if}
  </div>

  {#if plan.status === 'completed'}
    <form method="POST" action="?/restart" use:enhance={() => {
      return async ({ update }) => { await update({ reset: false }); };
    }}>
      <button type="submit" class="btn-start">Erneut starten</button>
    </form>
  {/if}

  {#if isActive}
    <!-- Progress -->
    <div>
      <p class="progress-label">{doneCount} / {total} erledigt</p>
      <div class="progress-bar">
        <div class="progress-fill" style="width: {total > 0 ? (doneCount / total) * 100 : 0}%"></div>
      </div>
    </div>

    <!-- Timer -->
    <div class="timer-card">
      <p class="timer-display">{fmt(cs)}</p>
      <div class="timer-btns">
        <button onclick={toggleTimer} class="timer-btn" class:running={timerRunning}>
          {timerRunning ? '⏸ Pause' : '▶ Timer starten'}
        </button>
        {#if cs > 0}
          <button onclick={resetTimer} class="timer-reset">↺</button>
        {/if}
      </div>
    </div>
  {/if}

  <!-- Exercise list -->
  <div class="exercise-list">
    {#each plan.exercises as ex}
      {#if isActive}
        <form
          method="POST"
          action="?/toggleDone"
          use:enhance={() => {
            return async ({ update }) => { await update({ reset: false }); };
          }}
          class="ex-card"
          class:done={ex.done}
          onclick={submitForm}
        >
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
      {:else}
        <div class="ex-card" class:done={ex.done}>
          {#if ex.imageUrl}
            <img src={ex.imageUrl} alt={ex.name} class="ex-img" loading="lazy" />
          {:else}
            <div class="ex-img ex-placeholder"></div>
          {/if}
          <span class="ex-name">{ex.name}</span>
          {#if ex.done}<span class="check-icon">✓</span>{/if}
        </div>
      {/if}
    {/each}
  </div>

  <!-- Complete -->
  {#if isActive && total > 0}
    <form method="POST" action="?/completePlan" use:enhance={() => {
      return async ({ update }) => { await update({ reset: false }); };
    }}>
      <input type="hidden" name="elapsedMs" value={elapsedMs} />
      <button type="submit" class="btn-complete">
        Training abschliessen ({doneCount}/{total})
      </button>
    </form>
  {/if}

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
    color: var(--text-primary); background: none; border: none;
    font-size: 1rem; font-weight: 600; cursor: pointer; padding: 0;
  }
  .back-arrow { font-size: 1.4rem; line-height: 1; }

  .header { display: flex; flex-direction: column; gap: 4px; }
  .title { font-size: 1.4rem; font-weight: 700; color: var(--text-primary); margin: 0; }
  .meta { font-size: 0.8rem; color: var(--text-secondary); margin: 0; }
  .best-time { font-size: 0.82rem; color: #14B8A6; font-weight: 600; margin: 0; }

  .btn-start {
    width: 100%; padding: 14px;
    background: var(--btn-primary-bg); color: var(--btn-primary-color);
    border: none; border-radius: 14px;
    font-size: 1rem; font-weight: 700; cursor: pointer;
  }

  .progress-label { font-size: 0.85rem; color: var(--text-secondary); margin: 0 0 6px; }
  .progress-bar { height: 4px; background: var(--border-1); border-radius: 4px; overflow: hidden; }
  .progress-fill {
    height: 100%; background: #14B8A6;
    border-radius: 4px; transition: width 0.3s;
  }

  .timer-card {
    background: var(--bg-card);
    border-radius: 14px;
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
  }

  .timer-display {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-primary);
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.02em;
    margin: 0;
    font-family: 'Courier New', monospace;
  }

  .timer-btns {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .timer-btn {
    padding: 8px 16px;
    background: #14B8A6;
    color: #fff;
    border: none;
    border-radius: 10px;
    font-size: 0.88rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
    white-space: nowrap;
  }
  .timer-btn.running { background: #0e9087; }

  .timer-reset {
    width: 34px; height: 34px;
    background: var(--bg-card-alt); color: var(--text-dim);
    border: none; border-radius: 8px;
    font-size: 1rem; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
  }

  .exercise-list { display: flex; flex-direction: column; gap: 10px; }

  .ex-card {
    display: flex; align-items: center; gap: 12px;
    background: var(--bg-card); border-radius: 14px; padding: 12px;
    transition: opacity 0.2s;
    border: none; width: 100%; text-align: left; cursor: default;
  }
  form.ex-card { cursor: pointer; }
  .ex-card.done { opacity: 0.5; }

  .ex-img {
    width: 56px; height: 56px;
    border-radius: 10px; object-fit: cover; flex-shrink: 0;
  }
  .ex-placeholder { background: var(--placeholder-gradient); }

  .ex-name { flex: 1; font-size: 0.95rem; font-weight: 600; color: var(--text-primary); }
  .done-text { text-decoration: line-through; color: var(--text-secondary); }

  .check-btn {
    width: 32px; height: 32px; border-radius: 50%;
    background: var(--bg-card-alt); color: var(--text-primary);
    border: 2px solid var(--border-2);
    font-size: 1rem; cursor: pointer; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.2s, border-color 0.2s;
  }
  .check-btn.checked { background: #14B8A6; border-color: #14B8A6; }

  .check-icon { color: #14B8A6; font-size: 1rem; font-weight: 700; }

  .btn-complete {
    width: 100%;
    padding: 14px;
    background: var(--bg-card);
    color: #14B8A6;
    border: 1.5px solid #14B8A6;
    border-radius: 14px;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
  }
</style>

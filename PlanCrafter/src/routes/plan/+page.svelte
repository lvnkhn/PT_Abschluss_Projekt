<script>
  import { enhance } from '$app/forms';
  let { data } = $props();

  const plan       = $derived(data.plan);
  const savedPlans = $derived(data.savedPlans);
  const isDraft    = $derived(plan?.status === 'draft');
  const isActive   = $derived(plan?.status === 'active');
  const doneCount  = $derived(plan?.exercises.filter(e => e.done).length ?? 0);
  const totalCount = $derived(plan?.exercises.length ?? 0);
</script>

<div class="page">

  {#if !plan}
    <div class="empty">
      <p class="empty-title">Kein aktiver Plan</p>
      <p class="empty-sub">Füge Übungen via "+" hinzu um einen Plan zu erstellen.</p>
      <a href="/exercises" class="btn-start">Übungen durchsuchen</a>
    </div>

  {:else if isDraft}
    <h2 class="title">In Bearbeitung</h2>
    <p class="subtitle">{totalCount} Übung{totalCount !== 1 ? 'en' : ''} hinzugefügt</p>

    <div class="exercise-list">
      {#each plan.exercises as ex}
        <div class="ex-card">
          {#if ex.imageUrl}
            <img src={ex.imageUrl} alt={ex.name} class="ex-img" />
          {:else}
            <div class="ex-img ex-placeholder"></div>
          {/if}
          <span class="ex-name">{ex.name}</span>
          <form method="POST" action="?/removeExercise" use:enhance={() => {
            return async ({ update }) => { await update({ reset: false }); };
          }}>
            <input type="hidden" name="planId" value={plan._id} />
            <input type="hidden" name="exerciseId" value={ex.exerciseId} />
            <button type="submit" class="remove-btn">✕</button>
          </form>
        </div>
      {/each}
    </div>

    {#if totalCount > 0}
      <form method="POST" action="?/saveName" use:enhance={() => {
        return async ({ update }) => { await update({ reset: false }); };
      }} class="name-form">
        <input type="hidden" name="planId" value={plan._id} />
        <input
          type="text"
          name="name"
          placeholder="Plan benennen..."
          class="name-input"
          required
        />
        <button type="submit" class="btn-save">Speichern</button>
      </form>
    {/if}

  {:else if isActive}
    <h2 class="title">{plan.name}</h2>
    <p class="subtitle">{doneCount} / {totalCount} erledigt</p>

    <div class="progress-bar">
      <div class="progress-fill" style="width: {totalCount > 0 ? (doneCount/totalCount)*100 : 0}%"></div>
    </div>

    <div class="exercise-list">
      {#each plan.exercises as ex}
        <form method="POST" action="?/toggleDone" use:enhance={() => {
          return async ({ update }) => { await update({ reset: false }); };
        }} class="ex-workout-card" class:done={ex.done}>
          <input type="hidden" name="planId" value={plan._id} />
          <input type="hidden" name="exerciseId" value={ex.exerciseId} />
          <input type="hidden" name="done" value={ex.done} />
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
      {/each}
    </div>
  {/if}

  <!-- Saved plans list -->
  {#if savedPlans.length > 0}
    <div class="divider"></div>
    <h3 class="section-title">Meine Pläne</h3>
    <div class="saved-list">
      {#each savedPlans as p}
        <a href="/plans/{p._id}" class="plan-row">
          <div class="plan-info">
            <p class="plan-name">{p.name}</p>
            <p class="plan-meta">
              {p.exercises.length} Übungen ·
              {#if p.lastCompletedAt}
                Zuletzt: {new Date(p.lastCompletedAt).toLocaleDateString('de-CH')}
              {:else}
                {new Date(p.createdAt).toLocaleDateString('de-CH')}
              {/if}
            </p>
          </div>
          <div class="plan-right">
            {#if p.status === 'active'}
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
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .title {
    font-size: 1.6rem;
    font-weight: 700;
    color: #fff;
    margin: 0;
  }
  .subtitle {
    color: #888;
    font-size: 0.85rem;
    margin: 0;
  }

  .progress-bar {
    height: 4px;
    background: #333;
    border-radius: 4px;
    overflow: hidden;
  }
  .progress-fill {
    height: 100%;
    background: #14B8A6;
    border-radius: 4px;
    transition: width 0.3s;
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
  .ex-workout-card.done {
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
  .done-text {
    text-decoration: line-through;
    color: #666;
  }

  .remove-btn {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background: #3A3A3A;
    color: #888;
    border: none;
    font-size: 0.85rem;
    cursor: pointer;
    flex-shrink: 0;
  }

  .check-btn {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #333;
    color: #fff;
    border: 2px solid #444;
    font-size: 1rem;
    cursor: pointer;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s, border-color 0.2s;
  }
  .check-btn.checked {
    background: #14B8A6;
    border-color: #14B8A6;
  }

  .name-form {
    display: flex;
    gap: 10px;
    margin-top: 4px;
  }
  .name-input {
    flex: 1;
    background: #2A2A2A;
    border: 1px solid #444;
    border-radius: 12px;
    padding: 12px 14px;
    color: #fff;
    font-size: 0.95rem;
    outline: none;
  }
  .name-input::placeholder { color: #555; }

  .btn-save {
    padding: 12px 20px;
    background: #fff;
    color: #111;
    border: none;
    border-radius: 12px;
    font-weight: 700;
    font-size: 0.9rem;
    cursor: pointer;
  }

  .empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-top: 80px;
    text-align: center;
  }
  .empty-title {
    font-size: 1.1rem;
    font-weight: 700;
    color: #fff;
    margin: 0;
  }
  .empty-sub {
    color: #666;
    font-size: 0.85rem;
    margin: 0;
  }
  .btn-start {
    margin-top: 8px;
    padding: 12px 24px;
    background: #fff;
    color: #111;
    border-radius: 12px;
    font-weight: 700;
    text-decoration: none;
    font-size: 0.9rem;
  }

  .divider {
    height: 1px;
    background: #2A2A2A;
    margin: 4px 0;
  }

  .section-title {
    font-size: 1rem;
    font-weight: 700;
    color: #fff;
    margin: 0;
  }

  .saved-list {
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
</style>

<script>
  import { enhance } from '$app/forms';
  let { data } = $props();

  const plan = $derived(data.plan);
  const planExerciseIds = $derived(new Set(data.plan.exercises.map(e => e.exerciseId)));

  const byCategory = $derived(
    data.categories.map(cat => ({
      ...cat,
      exercises: data.exercises.filter(ex => ex.categoryId === cat.slug),
    })).filter(cat => cat.exercises.length > 0)
  );
</script>

<div class="page">

  <button onclick={() => history.back()} class="back-btn">
    <span class="back-arrow">‹</span> Zurück
  </button>

  <h2 class="title">Plan bearbeiten</h2>

  <!-- Rename -->
  <form method="POST" action="?/rename" use:enhance={() => {
    return async ({ update }) => { await update({ reset: false }); };
  }} class="name-form">
    <input
      type="text"
      name="name"
      value={plan.name}
      placeholder="Plan benennen…"
      class="name-input"
      required
    />
    <button type="submit" class="btn-save">Umbenennen</button>
  </form>

  <!-- Current exercises -->
  <h3 class="section-title">Aktuelle Übungen ({plan.exercises.length})</h3>
  {#if plan.exercises.length === 0}
    <p class="empty-hint">Noch keine Übungen im Plan.</p>
  {:else}
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
            <input type="hidden" name="exerciseId" value={ex.exerciseId} />
            <button type="submit" class="remove-btn">✕</button>
          </form>
        </div>
      {/each}
    </div>
  {/if}

  <!-- Add exercises -->
  <h3 class="section-title">Übungen hinzufügen</h3>
  {#each byCategory as cat}
    <div class="cat-group">
      <p class="cat-label" style="color: {cat.color};">{cat.icon} {cat.name}</p>
      <div class="exercise-list">
        {#each cat.exercises as ex}
          {@const inPlan = planExerciseIds.has(ex._id)}
          <div class="ex-card">
            {#if ex.imageUrl}
              <img src={ex.imageUrl} alt={ex.name} class="ex-img" />
            {:else}
              <div class="ex-img ex-placeholder"></div>
            {/if}
            <span class="ex-name">{ex.name}</span>
            {#if inPlan}
              <span class="already-badge">✓</span>
            {:else}
              <form method="POST" action="?/addExercise" use:enhance={() => {
                return async ({ update }) => { await update({ reset: false }); };
              }}>
                <input type="hidden" name="exerciseId" value={ex._id} />
                <button type="submit" class="add-btn">+</button>
              </form>
            {/if}
          </div>
        {/each}
      </div>
    </div>
  {/each}

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

  .title { font-size: 1.4rem; font-weight: 700; color: #fff; margin: 0; }

  .name-form { display: flex; gap: 10px; }
  .name-input {
    flex: 1;
    background: #2A2A2A; border: 1px solid #444; border-radius: 12px;
    padding: 12px 14px; color: #fff; font-size: 0.95rem; outline: none;
  }
  .name-input::placeholder { color: #555; }
  .btn-save {
    padding: 12px 16px; background: #fff; color: #111;
    border: none; border-radius: 12px; font-weight: 700; font-size: 0.85rem; cursor: pointer;
    white-space: nowrap;
  }

  .section-title { font-size: 1rem; font-weight: 700; color: #fff; margin: 0; }
  .empty-hint { color: #666; font-size: 0.85rem; margin: 0; }

  .exercise-list { display: flex; flex-direction: column; gap: 8px; }

  .ex-card {
    display: flex; align-items: center; gap: 12px;
    background: #2A2A2A; border-radius: 14px; padding: 10px 12px;
  }
  .ex-img {
    width: 48px; height: 48px; border-radius: 10px;
    object-fit: cover; flex-shrink: 0;
  }
  .ex-placeholder { background: linear-gradient(135deg, #333, #444); }
  .ex-name { flex: 1; font-size: 0.9rem; font-weight: 600; color: #fff; }

  .remove-btn {
    width: 30px; height: 30px; border-radius: 8px;
    background: #3A3A3A; color: #888;
    border: none; font-size: 0.8rem; cursor: pointer; flex-shrink: 0;
  }

  .add-btn {
    width: 30px; height: 30px; border-radius: 8px;
    background: #fff; color: #111;
    border: none; font-size: 1.1rem; font-weight: 300; cursor: pointer; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
  }

  .already-badge {
    width: 30px; height: 30px; border-radius: 8px;
    background: #14B8A620; color: #14B8A6;
    font-size: 0.9rem; font-weight: 700; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
  }

  .cat-group { display: flex; flex-direction: column; gap: 8px; }
  .cat-label { font-size: 0.85rem; font-weight: 700; margin: 0; }
</style>

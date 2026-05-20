<script>
  import { enhance } from '$app/forms';
  import { toast } from '$lib/toast.svelte.js';
  let { data } = $props();
  const cat = data.category;

  let added = $state({});
  let openPicker = $state(null);

  function togglePicker(exId) {
    openPicker = openPicker === exId ? null : exId;
  }

  function handleAddEnhance(exId, planName) {
    return () => {
      openPicker = null;
      added[exId] = true;
      return async ({ update }) => {
        await update();
        toast.show(planName ? `→ ${planName}` : data.exercises.find(e => e._id === exId)?.name ?? '');
      };
    };
  }
</script>

<div class="page">

  <!-- Back -->
  <a href="/categories" class="back-btn">
    <span class="back-arrow">‹</span> Categories
  </a>

  <!-- Header -->
  <div class="cat-header">
    <span class="cat-icon">{cat.icon}</span>
    <h2 class="cat-name" style="color: {cat.color};">{cat.name}</h2>
    <p class="cat-count">{data.exercises.length} exercises</p>
  </div>

  <!-- Exercise list -->
  <div class="exercise-list">
    {#each data.exercises as ex}
      <div class="ex-card">
        <a href="/exercises/{ex._id}" class="ex-link">
          {#if ex.imageUrl}
            <img src={ex.imageUrl} alt={ex.name} class="ex-img" loading="lazy" />
          {:else}
            <div class="ex-img ex-placeholder"></div>
          {/if}
          <div class="ex-info">
            <p class="ex-name">{ex.name}</p>
            <div class="bodyparts">
              {#each ex.bodyParts as part}
                <span class="part-badge">{part}</span>
              {/each}
            </div>
            <p class="ex-desc">{ex.description}</p>
          </div>
        </a>

        <!-- Add to plan button / picker -->
        <div class="add-section">
          {#if added[ex._id]}
            <button type="button" class="add-btn added">✓</button>
          {:else if data.plans.length > 0}
            <button type="button" class="add-btn" onclick={() => togglePicker(ex._id)}>
              {openPicker === ex._id ? '×' : '+'}
            </button>
            {#if openPicker === ex._id}
              <div class="plan-picker">
                <p class="picker-label">Zu Plan:</p>
                <form method="POST" action="?/addToPlan" use:enhance={handleAddEnhance(ex._id, null)}>
                  <input type="hidden" name="exerciseId" value={ex._id} />
                  <button type="submit" class="picker-item">+ Neuer Entwurf</button>
                </form>
                {#each data.plans as plan}
                  <form method="POST" action="?/addToPlan" use:enhance={handleAddEnhance(ex._id, plan.name)}>
                    <input type="hidden" name="exerciseId" value={ex._id} />
                    <input type="hidden" name="planId" value={plan._id} />
                    <button type="submit" class="picker-item">{plan.name}</button>
                  </form>
                {/each}
              </div>
            {/if}
          {:else}
            <form method="POST" action="?/addToPlan" use:enhance={() => {
              added[ex._id] = true;
              return async ({ update }) => { await update(); toast.show(ex.name); };
            }}>
              <input type="hidden" name="exerciseId" value={ex._id} />
              <button type="submit" class="add-btn">+</button>
            </form>
          {/if}
        </div>
      </div>
    {/each}
  </div>

</div>

<style>
  .page { padding: 16px; display: flex; flex-direction: column; gap: 14px; }

  .back-btn {
    display: flex; align-items: center; gap: 4px;
    color: #fff; text-decoration: none;
    font-size: 1rem; font-weight: 600; width: fit-content;
  }
  .back-arrow { font-size: 1.4rem; line-height: 1; }

  .cat-header { display: flex; flex-direction: column; gap: 4px; padding: 4px 0 8px; }
  .cat-icon { font-size: 2rem; }
  .cat-name { font-size: 1.6rem; font-weight: 700; margin: 0; }
  .cat-count { color: #888; font-size: 0.85rem; margin: 0; }

  .exercise-list { display: flex; flex-direction: column; gap: 10px; }

  .ex-card {
    display: flex;
    align-items: center;
    background: #2A2A2A;
    border-radius: 14px;
    padding: 12px;
    gap: 12px;
  }

  .ex-link {
    display: flex; align-items: center; gap: 12px;
    flex: 1; text-decoration: none; min-width: 0;
  }

  .ex-img {
    width: 72px; height: 72px;
    border-radius: 10px; object-fit: cover; flex-shrink: 0;
  }
  .ex-placeholder { background: linear-gradient(135deg, #333, #444); }

  .ex-info { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
  .ex-name { font-size: 1rem; font-weight: 600; color: #fff; margin: 0; }

  .bodyparts { display: flex; flex-wrap: wrap; gap: 4px; }
  .part-badge {
    font-size: 0.68rem; font-weight: 500;
    padding: 2px 8px; border-radius: 6px;
    background: #383838; color: #aaa;
  }

  .ex-desc {
    font-size: 0.78rem; color: #888; margin: 0;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }

  /* Add section */
  .add-section { position: relative; flex-shrink: 0; }

  .add-btn {
    width: 40px; height: 40px; border-radius: 10px;
    background: #fff; color: #111; border: none;
    font-size: 1.4rem; font-weight: 300; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.2s;
  }
  .add-btn.added { background: #14B8A6; color: #fff; font-size: 1rem; }

  /* Plan picker */
  .plan-picker {
    position: absolute;
    right: 0; top: 46px;
    background: #1E1E1E;
    border: 1px solid #3A3A3A;
    border-radius: 12px;
    padding: 10px;
    z-index: 100;
    min-width: 170px;
    display: flex; flex-direction: column; gap: 6px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.4);
  }

  .picker-label {
    font-size: 0.72rem; color: #666; margin: 0 0 2px;
    text-transform: uppercase; letter-spacing: 0.4px;
  }

  .picker-item {
    width: 100%;
    background: #2A2A2A; border: 1px solid #444;
    border-radius: 8px; color: #fff;
    font-size: 0.85rem; padding: 8px 12px;
    cursor: pointer; text-align: left;
    transition: background 0.15s;
  }
  .picker-item:hover { background: #333; }
</style>

<script>
  import { enhance } from '$app/forms';
  import { toast } from '$lib/toast.svelte.js';
  import BodyMap from '$lib/components/BodyMap.svelte';
  let { data } = $props();
  const ex = data.exercise;
  const cat = data.category;

  let added = $state(false);
  let openPicker = $state(false);

  function handleAdd(planName) {
    return () => {
      openPicker = false;
      added = true;
      return async ({ update }) => {
        await update();
        toast.show(planName ?? ex.name);
      };
    };
  }
</script>

<div class="page">

  <!-- Back -->
  <button onclick={() => history.back()} class="back-btn">
    <span class="back-arrow">‹</span> {ex.name}
  </button>

  <!-- Image -->
  {#if ex.imageUrl}
    <img src={ex.imageUrl} alt={ex.name} class="hero-img" loading="lazy" />
  {:else}
    <div class="hero-img hero-placeholder"></div>
  {/if}

  <!-- Category badge -->
  {#if cat}
    <span class="cat-badge" style="background: {cat.color}; color: #fff;">
      {cat.name}
    </span>
  {/if}

  <!-- Body parts + BodyMap -->
  {#if ex.bodyParts?.length}
    <div class="anatomy-section">
      <BodyMap bodyParts={ex.bodyParts} />
    </div>
  {/if}

  <!-- Description -->
  {#if ex.description}
    <p class="description">{ex.description}</p>
  {/if}

  <!-- Instructions -->
  {#if ex.instructions?.length}
    <h3 class="instructions-title">Instructions</h3>
    <ol class="instructions-list">
      {#each ex.instructions as step, i}
        <li class="step">
          <span class="step-num">{i + 1}</span>
          <span class="step-text">{step}</span>
        </li>
      {/each}
    </ol>
  {/if}

  <!-- Reference link -->
  {#if ex.referenceUrl}
    <a href={ex.referenceUrl} target="_blank" rel="noopener noreferrer" class="ref-link">
      View Reference ↗
    </a>
  {/if}

  <!-- Add to plan -->
  <div class="add-section">
    {#if added}
      <button type="button" class="btn-add added">✓ Hinzugefügt</button>
    {:else if data.plans.length > 0}
      <button type="button" class="btn-add" onclick={() => openPicker = !openPicker}>
        {openPicker ? '× Schliessen' : '+ Zu Plan hinzufügen'}
      </button>
      {#if openPicker}
        <div class="plan-picker">
          <p class="picker-label">Zu welchem Plan?</p>
          <form method="POST" action="?/addToPlan" use:enhance={handleAdd(null)}>
            <input type="hidden" name="exerciseId" value={ex._id} />
            <button type="submit" class="picker-item">+ Neuer Entwurf</button>
          </form>
          {#each data.plans as plan}
            <form method="POST" action="?/addToPlan" use:enhance={handleAdd(plan.name)}>
              <input type="hidden" name="exerciseId" value={ex._id} />
              <input type="hidden" name="planId" value={plan._id} />
              <button type="submit" class="picker-item">{plan.name}</button>
            </form>
          {/each}
        </div>
      {/if}
    {:else}
      <form method="POST" action="?/addToPlan" use:enhance={() => {
        added = true;
        return async ({ update }) => { await update(); toast.show(ex.name); };
      }}>
        <input type="hidden" name="exerciseId" value={ex._id} />
        <button type="submit" class="btn-add">+ Zu Plan hinzufügen</button>
      </form>
    {/if}
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
    color: var(--text-primary);
    background: none;
    border: none;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    padding: 0;
  }
  .back-arrow { font-size: 1.4rem; line-height: 1; }

  .hero-img {
    width: 100%;
    aspect-ratio: 4/3;
    border-radius: 16px;
    object-fit: cover;
  }
  .hero-placeholder {
    background: var(--placeholder-gradient);
  }

  .cat-badge {
    display: inline-block;
    padding: 5px 16px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 600;
    width: fit-content;
  }

  .anatomy-section {
    background: var(--bg-card);
    border-radius: 14px;
    padding: 16px;
  }

  .description {
    color: var(--text-dim);
    font-size: 0.9rem;
    line-height: 1.5;
    margin: 0;
  }

  .instructions-title {
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0;
  }

  .instructions-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .step { display: flex; align-items: flex-start; gap: 12px; }

  .step-num {
    width: 28px; height: 28px;
    border-radius: 50%;
    background: var(--bg-card);
    color: var(--text-dim);
    font-size: 0.85rem; font-weight: 600;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }

  .step-text {
    color: var(--text-primary);
    font-size: 0.9rem;
    line-height: 1.5;
    padding-top: 4px;
  }

  .ref-link {
    display: inline-block;
    color: #14B8A6;
    font-size: 0.85rem;
    text-decoration: none;
    font-weight: 500;
  }

  .add-section { position: relative; }

  .btn-add {
    width: 100%;
    padding: 14px;
    background: var(--btn-primary-bg);
    color: var(--btn-primary-color);
    border: none;
    border-radius: 14px;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.2s;
  }
  .btn-add.added { background: #14B8A6; color: #fff; }

  .plan-picker {
    margin-top: 10px;
    background: var(--bg-card);
    border: 1px solid var(--border-1);
    border-radius: 14px;
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .picker-label {
    font-size: 0.75rem;
    color: var(--text-secondary);
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 0.4px;
  }

  .picker-item {
    width: 100%;
    background: var(--bg-card-alt);
    border: 1px solid var(--border-1);
    border-radius: 10px;
    color: var(--text-primary);
    font-size: 0.9rem;
    padding: 10px 14px;
    cursor: pointer;
    text-align: left;
    transition: background 0.15s;
  }
  .picker-item:hover { background: var(--border-1); }
</style>

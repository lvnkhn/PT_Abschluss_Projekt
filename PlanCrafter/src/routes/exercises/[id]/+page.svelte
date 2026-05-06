<script>
  let { data } = $props();
  const ex = data.exercise;
  const cat = data.category;
</script>

<div class="page">

  <!-- Back -->
  <button onclick={() => history.back()} class="back-btn">
    <span class="back-arrow">‹</span> {ex.name}
  </button>

  <!-- Image -->
  {#if ex.imageUrl}
    <img src={ex.imageUrl} alt={ex.name} class="hero-img" />
  {:else}
    <div class="hero-img hero-placeholder"></div>
  {/if}

  <!-- Category badge -->
  {#if cat}
    <span class="cat-badge" style="background: {cat.color}; color: #fff;">
      {cat.name}
    </span>
  {/if}

  <!-- Body parts -->
  {#if ex.bodyParts?.length}
    <div class="bodyparts">
      {#each ex.bodyParts as part}
        <span class="part-badge">{part}</span>
      {/each}
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
    color: #fff;
    background: none;
    border: none;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    padding: 0;
  }
  .back-arrow {
    font-size: 1.4rem;
    line-height: 1;
  }

  .hero-img {
    width: 100%;
    aspect-ratio: 4/3;
    border-radius: 16px;
    object-fit: cover;
  }
  .hero-placeholder {
    background: linear-gradient(135deg, #2A2A2A, #3A3A3A);
  }

  .cat-badge {
    display: inline-block;
    padding: 5px 16px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 600;
    width: fit-content;
  }

  .bodyparts {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .part-badge {
    padding: 5px 14px;
    border-radius: 10px;
    background: #2A2A2A;
    color: #ccc;
    font-size: 0.82rem;
    font-weight: 500;
  }

  .description {
    color: #aaa;
    font-size: 0.9rem;
    line-height: 1.5;
    margin: 0;
  }

  .instructions-title {
    font-size: 1rem;
    font-weight: 600;
    color: #fff;
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

  .step {
    display: flex;
    align-items: flex-start;
    gap: 12px;
  }

  .step-num {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: #2A2A2A;
    color: #ccc;
    font-size: 0.85rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .step-text {
    color: #ddd;
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
    margin-top: 4px;
  }
</style>

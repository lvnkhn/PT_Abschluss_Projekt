<script>
  import { enhance } from '$app/forms';
  import { i18n } from '$lib/i18n.svelte.js';
  let { data, form } = $props();

  const BODY_PARTS = [
    'Abs', 'Adductors', 'Arms', 'Back', 'Calves',
    'Chest', 'Core', 'Full Body', 'Glutes', 'Hips',
    'Lateral', 'Legs', 'Quads', 'Shoulders',
  ];

  let submitting = $state(false);
</script>

<div class="page">

  <h2 class="title">{i18n.t('Übung hinzufügen', 'Add exercise')}</h2>
  <p class="subtitle">{i18n.t('Erstelle eine eigene Übung für deine Pläne.', 'Create a custom exercise for your plans.')}</p>

  {#if form?.error}
    <p class="error">{form.error}</p>
  {/if}

  <form
    method="POST"
    action="?/create"
    use:enhance={() => {
      submitting = true;
      return async ({ update }) => {
        await update();
        submitting = false;
      };
    }}
    class="exercise-form"
  >

    <!-- Name -->
    <div class="field">
      <label for="name">{i18n.t('Name der Übung', 'Exercise name')} *</label>
      <input
        type="text"
        id="name"
        name="name"
        required
        minlength="2"
        placeholder={i18n.t('z.B. Kniebeuge', 'e.g. Squat')}
        class="input"
        autocomplete="off"
      />
    </div>

    <!-- Category -->
    <div class="field">
      <label for="categoryId">{i18n.t('Kategorie', 'Category')} *</label>
      <select id="categoryId" name="categoryId" required class="input select">
        <option value="" disabled selected>{i18n.t('Kategorie wählen…', 'Select category…')}</option>
        {#each data.categories as cat}
          <option value={cat.slug}>{cat.icon} {cat.name}</option>
        {/each}
      </select>
    </div>

    <!-- Body Parts -->
    <div class="field">
      <label>{i18n.t('Muskelgruppen', 'Muscle groups')}</label>
      <div class="bodyparts-grid">
        {#each BODY_PARTS as part}
          <label class="part-label">
            <input type="checkbox" name="bodyParts" value={part} class="part-check" />
            <span class="part-pill">{part}</span>
          </label>
        {/each}
      </div>
    </div>

    <!-- Reference URL -->
    <div class="field">
      <label for="referenceUrl">{i18n.t('Referenz-URL (optional)', 'Reference URL (optional)')}</label>
      <input
        type="url"
        id="referenceUrl"
        name="referenceUrl"
        placeholder="https://…"
        class="input"
        autocomplete="off"
      />
    </div>

    <button type="submit" class="btn-submit" disabled={submitting}>
      {#if submitting}
        {i18n.t('Speichern…', 'Saving…')}
      {:else}
        {i18n.t('Übung speichern', 'Save exercise')}
      {/if}
    </button>

  </form>

</div>

<style>
  .page {
    padding: 20px 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-width: 540px;
    margin: 0 auto;
  }

  .title {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-primary);
    margin: 0;
  }

  .subtitle {
    font-size: 0.88rem;
    color: var(--text-secondary);
    margin: 0;
  }

  .error {
    color: #EF4444;
    font-size: 0.88rem;
    background: #EF444415;
    border: 1px solid #EF4444;
    border-radius: 10px;
    padding: 10px 14px;
    margin: 0;
  }

  .exercise-form {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  label {
    font-size: 0.82rem;
    font-weight: 600;
    color: var(--text-dim);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .input {
    background: var(--bg-input);
    border: 1px solid var(--border-2);
    border-radius: 12px;
    padding: 13px 14px;
    color: var(--text-primary);
    font-size: 0.95rem;
    outline: none;
    width: 100%;
  }
  .input:focus { border-color: #14B8A6; }
  .input::placeholder { color: var(--text-secondary); }

  .select {
    appearance: none;
    cursor: pointer;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='%23888'%3E%3Cpath d='M0 0l6 8 6-8z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 14px center;
    padding-right: 36px;
  }
  .select option { background: var(--bg-card); color: var(--text-primary); }

  .bodyparts-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .part-label {
    cursor: pointer;
    text-transform: none;
    letter-spacing: 0;
    font-weight: 400;
    font-size: 1rem;
  }

  .part-check {
    display: none;
  }

  .part-pill {
    display: inline-block;
    padding: 6px 14px;
    border-radius: 20px;
    background: var(--bg-card-alt);
    border: 1.5px solid var(--border-2);
    color: var(--text-secondary);
    font-size: 0.82rem;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.15s, color 0.15s, border-color 0.15s;
    user-select: none;
  }

  .part-check:checked + .part-pill {
    background: #14B8A620;
    border-color: #14B8A6;
    color: #14B8A6;
  }

  .btn-submit {
    padding: 14px;
    background: #14B8A6;
    color: #fff;
    border: none;
    border-radius: 14px;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.2s;
    margin-top: 4px;
  }
  .btn-submit:hover:not(:disabled) { background: #0e9087; }
  .btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }
</style>

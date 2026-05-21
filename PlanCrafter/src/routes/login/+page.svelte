<script>
  import { i18n } from '$lib/i18n.svelte.js';
  let { form } = $props();
</script>

<div class="page">
  <h2 class="title">Login</h2>

  {#if form?.error}
    <p class="error">{form.error}</p>
  {/if}

  <form method="POST" class="auth-form">
    <div class="field">
      <label for="username">{i18n.t('Benutzername', 'Username')}</label>
      <input type="text" id="username" name="username" required class="input" autocomplete="username" />
    </div>
    <div class="field">
      <label for="password">{i18n.t('Passwort', 'Password')}</label>
      <input type="password" id="password" name="password" required class="input" autocomplete="current-password" />
    </div>
    <button type="submit" class="btn-submit">{i18n.t('Anmelden', 'Sign in')}</button>
  </form>

  <p class="alt-link">
    {i18n.t('Noch kein Konto?', 'No account yet?')} <a href="/register">{i18n.t('Registrieren', 'Register')}</a>
  </p>
  <p class="alt-link">
    <a href="/">{i18n.t('Ohne Konto fortfahren (Demo)', 'Continue without account (Demo)')}</a>
  </p>
</div>

<style>
  .page {
    padding: 40px 24px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 420px;
    margin: 0 auto;
  }
  .title { font-size: 1.6rem; font-weight: 700; color: var(--text-primary); }
  .error {
    color: #EF4444; font-size: 0.9rem;
    background: #EF444415; border: 1px solid #EF4444;
    border-radius: 10px; padding: 10px 14px;
  }
  .auth-form { display: flex; flex-direction: column; gap: 16px; }
  .field { display: flex; flex-direction: column; gap: 6px; }
  label { font-size: 0.85rem; color: var(--text-dim); }
  .input {
    background: var(--bg-input); border: 1px solid var(--border-2); border-radius: 12px;
    padding: 14px; color: var(--text-primary); font-size: 0.95rem; outline: none;
  }
  .input:focus { border-color: #14B8A6; }
  .btn-submit {
    padding: 14px; background: #14B8A6; color: #fff;
    border: none; border-radius: 12px; font-size: 1rem; font-weight: 700; cursor: pointer;
  }
  .alt-link { color: var(--text-secondary); font-size: 0.88rem; text-align: center; }
  .alt-link a { color: #14B8A6; text-decoration: none; }
</style>

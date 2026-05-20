<script>
  let { form } = $props();
</script>

<div class="page">
  <h2 class="title">Login</h2>

  {#if form?.error}
    <p class="error">{form.error}</p>
  {/if}

  <form method="POST" class="auth-form">
    <div class="field">
      <label for="username">Benutzername</label>
      <input type="text" id="username" name="username" required class="input" autocomplete="username" />
    </div>
    <div class="field">
      <label for="password">Passwort</label>
      <input type="password" id="password" name="password" required class="input" autocomplete="current-password" />
    </div>
    <button type="submit" class="btn-submit">Anmelden</button>
  </form>

  <p class="alt-link">
    Noch kein Konto? <a href="/register">Registrieren</a>
  </p>
  <p class="alt-link">
    <a href="/">Ohne Konto fortfahren (Demo)</a>
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
  .title { font-size: 1.6rem; font-weight: 700; color: #fff; }
  .error {
    color: #EF4444; font-size: 0.9rem;
    background: #EF444415; border: 1px solid #EF4444;
    border-radius: 10px; padding: 10px 14px;
  }
  .auth-form { display: flex; flex-direction: column; gap: 16px; }
  .field { display: flex; flex-direction: column; gap: 6px; }
  label { font-size: 0.85rem; color: #aaa; }
  .input {
    background: #2A2A2A; border: 1px solid #444; border-radius: 12px;
    padding: 14px; color: #fff; font-size: 0.95rem; outline: none;
  }
  .input:focus { border-color: #14B8A6; }
  .btn-submit {
    padding: 14px; background: #14B8A6; color: #fff;
    border: none; border-radius: 12px; font-size: 1rem; font-weight: 700; cursor: pointer;
  }
  .alt-link { color: #888; font-size: 0.88rem; text-align: center; }
  .alt-link a { color: #14B8A6; text-decoration: none; }
</style>

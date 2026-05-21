<script>
  import { enhance } from '$app/forms';
  import { i18n } from '$lib/i18n.svelte.js';
  let { data } = $props();

  // Build 52-week contribution grid (364 days + today)
  function buildGrid(logins) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Count logins per day
    const counts = {};
    logins.forEach(l => {
      const d = new Date(l);
      d.setHours(0, 0, 0, 0);
      const key = d.toISOString().slice(0, 10);
      counts[key] = (counts[key] ?? 0) + 1;
    });

    // Build 53 columns (weeks), 7 rows (days Mon–Sun)
    const weeks = [];
    // Start from 52 weeks ago, aligned to Monday
    const start = new Date(today);
    start.setDate(start.getDate() - 364);
    // Rewind to previous Monday
    const dow = start.getDay(); // 0=Sun
    start.setDate(start.getDate() - ((dow + 6) % 7));

    let cursor = new Date(start);
    while (cursor <= today) {
      const week = [];
      for (let d = 0; d < 7; d++) {
        const key = cursor.toISOString().slice(0, 10);
        week.push({ date: key, count: counts[key] ?? 0, future: cursor > today });
        cursor.setDate(cursor.getDate() + 1);
      }
      weeks.push(week);
    }
    return weeks;
  }

  const grid = $derived(buildGrid(data.logins));
  const totalLogins = $derived(data.logins.length);

  function cellColor(count) {
    if (count === 0) return 'var(--bg-card-alt)';
    if (count === 1) return '#0d4f46';
    if (count === 2) return '#0e7a6d';
    if (count === 3) return '#11a89a';
    return '#14B8A6';
  }

  function monthLabels(weeks) {
    const labels = [];
    let lastMonth = -1;
    weeks.forEach((week, i) => {
      const m = new Date(week[0].date).getMonth();
      if (m !== lastMonth) {
        labels.push({ col: i, label: new Date(week[0].date).toLocaleString('de-CH', { month: 'short' }) });
        lastMonth = m;
      }
    });
    return labels;
  }
  const mLabels = $derived(monthLabels(grid));
</script>

<div class="page">

  <div class="profile-header">
    <div class="avatar">
      {data.username[0].toUpperCase()}
    </div>
    <div>
      <h2 class="username">{data.username}</h2>
      <p class="stats">{totalLogins} Login{totalLogins !== 1 ? 's' : ''} {i18n.t('gesamt', 'total')}</p>
    </div>
  </div>

  <!-- Contribution Map -->
  <div class="contribution-section">
    <h3 class="section-title">{i18n.t('Aktivität', 'Activity')}</h3>
    <p class="sub">{totalLogins} {i18n.t('Einloggen in den letzten 52 Wochen', 'logins in the last 52 weeks')}</p>

    <div class="grid-wrapper">
      <!-- Month labels -->
      <div class="month-row">
        {#each mLabels as ml}
          <span class="month-label" style="grid-column: {ml.col + 1}">{ml.label}</span>
        {/each}
      </div>

      <!-- Day labels + grid -->
      <div class="grid-row">
        <div class="day-labels">
          <span></span>
          <span>Mo</span>
          <span></span>
          <span>Mi</span>
          <span></span>
          <span>Fr</span>
          <span></span>
        </div>
        <div class="contrib-grid" style="--weeks: {grid.length}">
          {#each grid as week}
            <div class="week-col">
              {#each week as day}
                <div
                  class="day-cell"
                  class:future={day.future}
                  style="background: {day.future ? 'transparent' : cellColor(day.count)}"
                  title="{day.date}: {day.count} Login{day.count !== 1 ? 's' : ''}"
                ></div>
              {/each}
            </div>
          {/each}
        </div>
      </div>
    </div>

    <!-- Legend -->
    <div class="legend">
      <span class="legend-label">{i18n.t('Weniger', 'Less')}</span>
      <div class="legend-cell" style="background: var(--bg-card-alt)"></div>
      <div class="legend-cell" style="background: #0d4f46"></div>
      <div class="legend-cell" style="background: #0e7a6d"></div>
      <div class="legend-cell" style="background: #11a89a"></div>
      <div class="legend-cell" style="background: #14B8A6"></div>
      <span class="legend-label">{i18n.t('Mehr', 'More')}</span>
    </div>
  </div>

  <!-- Logout -->
  <form method="POST" action="?/logout" use:enhance>
    <button type="submit" class="btn-logout">{i18n.t('Abmelden', 'Sign out')}</button>
  </form>

</div>

<style>
  .page {
    padding: 20px 16px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    max-width: 700px;
    margin: 0 auto;
  }

  .profile-header {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: linear-gradient(135deg, #14B8A6, #A855F7);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.6rem;
    font-weight: 700;
    color: #fff;
    flex-shrink: 0;
  }

  .username {
    font-size: 1.4rem;
    font-weight: 700;
    color: var(--text-primary);
    margin: 0;
  }

  .stats {
    font-size: 0.85rem;
    color: var(--text-secondary);
    margin: 2px 0 0;
  }

  .contribution-section {
    background: var(--bg-card);
    border-radius: 16px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .section-title {
    font-size: 1rem;
    font-weight: 700;
    color: var(--text-primary);
    margin: 0;
  }

  .sub {
    font-size: 0.8rem;
    color: var(--text-secondary);
    margin: 0 0 8px;
  }

  .grid-wrapper {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .month-row {
    display: grid;
    grid-template-columns: 28px repeat(var(--weeks, 53), 12px);
    gap: 2px;
    margin-bottom: 2px;
    padding-left: 28px;
  }

  .month-label {
    font-size: 0.65rem;
    color: var(--text-secondary);
    white-space: nowrap;
  }

  .grid-row {
    display: flex;
    gap: 4px;
    align-items: flex-start;
  }

  .day-labels {
    display: flex;
    flex-direction: column;
    gap: 2px;
    flex-shrink: 0;
    width: 24px;
  }

  .day-labels span {
    font-size: 0.6rem;
    color: var(--text-secondary);
    height: 12px;
    line-height: 12px;
    text-align: right;
    padding-right: 4px;
  }

  .contrib-grid {
    display: flex;
    gap: 2px;
    flex-shrink: 0;
  }

  .week-col {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .day-cell {
    width: 12px;
    height: 12px;
    border-radius: 2px;
    transition: opacity 0.1s;
  }

  .day-cell:hover {
    opacity: 0.7;
    cursor: default;
  }

  .day-cell.future {
    background: transparent !important;
  }

  .legend {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-top: 6px;
    justify-content: flex-end;
  }

  .legend-label {
    font-size: 0.7rem;
    color: var(--text-secondary);
  }

  .legend-cell {
    width: 12px;
    height: 12px;
    border-radius: 2px;
  }

  .btn-logout {
    width: 100%;
    padding: 14px;
    background: var(--bg-card);
    color: #EF4444;
    border: 1.5px solid #EF4444;
    border-radius: 14px;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
  }
  .btn-logout:hover {
    background: #EF444415;
  }
</style>

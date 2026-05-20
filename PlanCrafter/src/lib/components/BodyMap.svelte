<script>
  let { bodyParts = [] } = $props();

  const parts = bodyParts.map(p => p.toLowerCase());

  function active(...keywords) {
    return keywords.some(k => parts.some(p => p.includes(k) || k.includes(p)));
  }

  const on  = '#14B8A6';
  const off = '#2E2E2E';
  const stroke = '#4A4A4A';
</script>

<div class="body-map">
  <p class="map-label">Muskelgruppen</p>
  <svg viewBox="0 0 160 320" xmlns="http://www.w3.org/2000/svg" class="body-svg">
    <!-- Head -->
    <ellipse cx="80" cy="22" rx="20" ry="22" fill={off} stroke={stroke} stroke-width="1.5"/>
    <!-- Neck -->
    <rect x="72" y="42" width="16" height="14" rx="4" fill={off} stroke={stroke} stroke-width="1.5"/>

    <!-- Left Shoulder -->
    <ellipse cx="36" cy="64" rx="18" ry="11" fill={active('shoulder', 'delt', 'trap') ? on : off} stroke={stroke} stroke-width="1.5"/>
    <!-- Right Shoulder -->
    <ellipse cx="124" cy="64" rx="18" ry="11" fill={active('shoulder', 'delt', 'trap') ? on : off} stroke={stroke} stroke-width="1.5"/>

    <!-- Chest / Torso upper -->
    <path d="M52 54 L108 54 L112 96 L48 96 Z" rx="6"
      fill={active('chest', 'pec', 'back', 'lat') ? on : off} stroke={stroke} stroke-width="1.5"/>

    <!-- Core / Abs -->
    <rect x="48" y="96" width="64" height="50" rx="8"
      fill={active('core', 'ab', 'oblique', 'stomach', 'hip flex') ? on : off} stroke={stroke} stroke-width="1.5"/>

    <!-- Left Upper Arm -->
    <rect x="16" y="58" width="18" height="46" rx="8"
      fill={active('bicep', 'tricep', 'arm') ? on : off} stroke={stroke} stroke-width="1.5"/>
    <!-- Right Upper Arm -->
    <rect x="126" y="58" width="18" height="46" rx="8"
      fill={active('bicep', 'tricep', 'arm') ? on : off} stroke={stroke} stroke-width="1.5"/>

    <!-- Left Forearm -->
    <rect x="14" y="106" width="18" height="38" rx="7"
      fill={active('forearm', 'wrist') ? on : off} stroke={stroke} stroke-width="1.5"/>
    <!-- Right Forearm -->
    <rect x="128" y="106" width="18" height="38" rx="7"
      fill={active('forearm', 'wrist') ? on : off} stroke={stroke} stroke-width="1.5"/>

    <!-- Left Hand -->
    <ellipse cx="23" cy="152" rx="11" ry="14" fill={off} stroke={stroke} stroke-width="1.5"/>
    <!-- Right Hand -->
    <ellipse cx="137" cy="152" rx="11" ry="14" fill={off} stroke={stroke} stroke-width="1.5"/>

    <!-- Hips / Glutes -->
    <rect x="46" y="146" width="68" height="24" rx="10"
      fill={active('hip', 'glute', 'groin', 'adduct') ? on : off} stroke={stroke} stroke-width="1.5"/>

    <!-- Left Thigh -->
    <rect x="48" y="168" width="30" height="70" rx="10"
      fill={active('quad', 'hamstring', 'thigh', 'leg') ? on : off} stroke={stroke} stroke-width="1.5"/>
    <!-- Right Thigh -->
    <rect x="82" y="168" width="30" height="70" rx="10"
      fill={active('quad', 'hamstring', 'thigh', 'leg') ? on : off} stroke={stroke} stroke-width="1.5"/>

    <!-- Left Calf -->
    <rect x="50" y="240" width="26" height="58" rx="8"
      fill={active('calf', 'shin', 'ankle') ? on : off} stroke={stroke} stroke-width="1.5"/>
    <!-- Right Calf -->
    <rect x="84" y="240" width="26" height="58" rx="8"
      fill={active('calf', 'shin', 'ankle') ? on : off} stroke={stroke} stroke-width="1.5"/>

    <!-- Left Foot -->
    <ellipse cx="63" cy="304" rx="16" ry="8" fill={off} stroke={stroke} stroke-width="1.5"/>
    <!-- Right Foot -->
    <ellipse cx="97" cy="304" rx="16" ry="8" fill={off} stroke={stroke} stroke-width="1.5"/>
  </svg>

  {#if bodyParts.length > 0}
    <div class="legend">
      {#each bodyParts as part}
        <span class="legend-chip">{part}</span>
      {/each}
    </div>
  {/if}
</div>

<style>
  .body-map {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }

  .map-label {
    font-size: 0.75rem;
    color: #666;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin: 0;
  }

  .body-svg {
    width: 110px;
    height: auto;
  }

  .legend {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    justify-content: center;
  }

  .legend-chip {
    font-size: 0.75rem;
    padding: 3px 10px;
    border-radius: 10px;
    background: #14B8A615;
    color: #14B8A6;
    border: 1px solid #14B8A640;
  }
</style>

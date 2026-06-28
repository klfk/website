<script lang="ts">
  import { getContext } from 'svelte';
  import { translations, type Lang } from '$lib/i18n';
  import SkillBar from '$lib/components/school/SkillBar.svelte';

  const langCtx = getContext<{ current: Lang }>('lang');
  const t = $derived(translations[langCtx.current].skills);

  // Skills data — labels are language-agnostic (tech names), groups come from translations
  const skillData = [
    [
      { name: 'HTML / CSS',   level: 4 },
      { name: 'JavaScript',   level: 3 },
      { name: 'PHP',          level: 3 },
      { name: 'Python',       level: 3 },
      { name: 'Java (OOP)',   level: 3 },
      { name: 'SQL',          level: 3 },
      { name: 'C',            level: 2 },
      { name: 'Rust',         level: 2 },
      { name: 'Lua',          level: 2 },
    ],
    [
      { name: 'MySQL',               level: 3 },
      { name: 'NoSQL (Mongo o. ä.)', level: 2 },
    ],
    [
      { name: 'Svelte / SvelteKit', level: 3 },
    ],
    [
      { name: 'Git / GitHub',                  level: 4 },
      { name: 'Docker / Container',            level: 2 },
      { name: 'Cloud-Grundlagen (Cloudflare)', level: 3 },
      { name: 'Typst',                         level: 4 },
    ],
    [
      { name: 'macOS',               level: 4 },
      { name: 'Linux (Server, VMs)', level: 3 },
      { name: 'Windows',             level: 2 },
    ],
    [
      { name: 'Neovim (eigene Konfiguration)', level: 4 },
      { name: 'VS Code',                       level: 3 },
      { name: 'Ghostty / Terminal-Setup',      level: 4 },
      { name: 'AeroSpace WM',                  level: 3 },
    ],
    [
      { name: 'Selbständiges Lernen',                level: 4 },
      { name: 'Kommunikation in Gruppen',            level: 3 },
      { name: 'Strukturierte Planung',               level: 4 },
      { name: 'Problemlösung / analytisches Denken', level: 4 },
    ],
  ];
</script>

<svelte:head>
  <title>{t.meta_title}</title>
  <meta name="description" content={t.meta_desc} />
  <meta property="og:title" content={t.og_title} />
  <meta property="og:type"  content="website" />
</svelte:head>

<header class="page-head">
  <h1>{t.heading}</h1>
  <p class="lead">{t.lead}</p>
</header>

<div class="groups">
  {#each t.groups as group, i}
    <section
      class="group"
      aria-labelledby="g-{group.label.replace(/[^a-z0-9]/gi, '-')}"
    >
      <h2
        class="group-label"
        id="g-{group.label.replace(/[^a-z0-9]/gi, '-')}"
      >{group.label}</h2>
      <ul class="skill-list">
        {#each skillData[i] as skill}
          <SkillBar name={skill.name} level={skill.level} />
        {/each}
      </ul>
    </section>
  {/each}
</div>

<!-- ── Legend ─────────────────────────────────────────────────────── -->
<aside class="legend" aria-label={t.legend}>
  <h2 class="legend-heading">{t.legend}</h2>
  <dl class="legend-list">
    {#each t.legend_items as [lvl, desc]}
      <div class="legend-row">
        <dt class="legend-lvl">{lvl}/5</dt>
        <dd class="legend-desc">{desc}</dd>
      </div>
    {/each}
  </dl>
</aside>

<style>
  .page-head { margin-bottom: 2rem; }

  h1 {
    font-family: 'VT323', monospace;
    font-size: 2.2rem;
    font-weight: 400;
    letter-spacing: 0.02em;
    margin: 0 0 0.35rem;
    color: var(--s-text);
  }

  .lead { color: var(--s-muted); font-size: 0.875rem; margin: 0; }

  .groups {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2.5rem;
  }

  .group {
    background: var(--s-surface);
    border: 1px solid var(--s-border);
    border-radius: 6px;
    padding: 1.1rem 1.4rem;
  }

  .group-label {
    font-size: 0.63rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: var(--s-muted);
    margin: 0 0 0.75rem;
    font-family: monospace;
    padding-bottom: 0.4rem;
    border-bottom: 1px solid var(--s-border);
  }

  .skill-list { display: flex; flex-direction: column; }

  .legend {
    border-top: 1px solid var(--s-border);
    padding-top: 1.5rem;
  }

  .legend-heading {
    font-size: 0.63rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: var(--s-muted);
    margin: 0 0 0.8rem;
    font-family: monospace;
  }

  .legend-list {
    max-width: 520px;
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
  }

  .legend-row {
    display: grid;
    grid-template-columns: 36px 1fr;
    gap: 0.75rem;
    padding: 0.4rem 0;
    border-bottom: 1px solid var(--s-border);
    font-size: 0.8rem;
    align-items: baseline;
  }

  .legend-row:last-child { border-bottom: none; }

  .legend-lvl {
    font-family: 'VT323', monospace;
    font-size: 0.9rem;
    color: var(--s-text);
    font-weight: 600;
  }

  .legend-desc { color: var(--s-muted); margin: 0; line-height: 1.45; }
</style>

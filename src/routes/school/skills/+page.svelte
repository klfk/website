<script lang="ts">
  import SkillBar from '$lib/components/school/SkillBar.svelte';

  type SkillGroup = {
    label: string;
    skills: { name: string; level: number }[];
  };

  const groups: SkillGroup[] = [
    {
      label: 'Programmiersprachen',
      skills: [
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
    },
    {
      label: 'Datenbanken',
      skills: [
        { name: 'MySQL',              level: 3 },
        { name: 'NoSQL (Mongo o. ä.)', level: 2 },
      ],
    },
    {
      label: 'Frameworks / Libraries',
      skills: [
        { name: 'Svelte / SvelteKit', level: 3 },
      ],
    },
    {
      label: 'Tools & DevOps',
      skills: [
        { name: 'Git / GitHub',                    level: 4 },
        { name: 'Docker / Container',              level: 2 },
        { name: 'Cloud-Grundlagen (Cloudflare)',   level: 3 },
        { name: 'Typst',                           level: 4 },
      ],
    },
    {
      label: 'Betriebssysteme',
      skills: [
        { name: 'macOS',            level: 4 },
        { name: 'Linux (Server, VMs)', level: 3 },
        { name: 'Windows',          level: 2 },
      ],
    },
    {
      label: 'Editoren / Workflow',
      skills: [
        { name: 'Neovim (eigene Konfiguration)', level: 4 },
        { name: 'VS Code',                       level: 3 },
        { name: 'Ghostty / Terminal-Setup',      level: 4 },
        { name: 'AeroSpace WM',                  level: 3 },
      ],
    },
    {
      label: 'Sozial / Methodik',
      skills: [
        { name: 'Selbständiges Lernen',              level: 4 },
        { name: 'Kommunikation in Gruppen',          level: 3 },
        { name: 'Strukturierte Planung',             level: 4 },
        { name: 'Problemlösung / analytisches Denken', level: 4 },
      ],
    },
  ];

  const legend: [number, string][] = [
    [1, 'Grundkenntnisse, keine praktische Erfahrung'],
    [2, 'Kenntnisse vorhanden, wenig praktische Erfahrung'],
    [3, 'Gute Kenntnisse, regelmässige praktische Erfahrung'],
    [4, 'Sehr gute Kenntnisse, viel praktische Erfahrung'],
    [5, 'Experte, umfangreiche praktische Erfahrung'],
  ];
</script>

<svelte:head>
  <title>Kenntnisse — Ivan Matiash</title>
  <meta
    name="description"
    content="ICT-Kompetenzübersicht von Ivan Matiash nach IDAF-Skala 1–5: Programmiersprachen, Datenbanken, Tools, Betriebssysteme."
  />
  <meta property="og:title" content="Kenntnisse — Ivan Matiash" />
  <meta property="og:type"  content="website" />
</svelte:head>

<header class="page-head">
  <h1>Kenntnisse</h1>
  <p class="lead">Informatikkompetenz-Übersicht nach IDAF-Skala (1–5).</p>
</header>

<div class="groups">
  {#each groups as group}
    <section
      class="group"
      aria-labelledby="g-{group.label.replace(/[\s\/&]+/g, '-').toLowerCase()}"
    >
      <h2 id="g-{group.label.replace(/[\s\/&]+/g, '-').toLowerCase()}" class="group-label">
        {group.label}
      </h2>
      <div class="skill-list">
        {#each group.skills as skill}
          <SkillBar name={skill.name} level={skill.level} />
        {/each}
      </div>
    </section>
  {/each}
</div>

<!-- ── Legend ─────────────────────────────────────────────────────── -->
<aside class="legend" aria-label="Bewertungsskala">
  <h2 class="legend-heading">Legende</h2>
  <dl class="legend-list">
    {#each legend as [lvl, desc]}
      <div class="legend-row">
        <dt class="legend-lvl">{lvl}/5</dt>
        <dd class="legend-desc">{desc}</dd>
      </div>
    {/each}
  </dl>
</aside>

<style>
  .page-head {
    margin-bottom: 2rem;
  }

  h1 {
    font-family: 'VT323', monospace;
    font-size: 2.2rem;
    font-weight: 400;
    letter-spacing: 0.02em;
    margin: 0 0 0.35rem;
    color: var(--s-text);
  }

  .lead {
    color: var(--s-muted);
    font-size: 0.875rem;
    margin: 0;
  }

  /* ── Skill groups ────────────────────────────────────────────────── */
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

  .skill-list {
    display: flex;
    flex-direction: column;
  }

  /* ── Legend ──────────────────────────────────────────────────────── */
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

  .legend-row:last-child {
    border-bottom: none;
  }

  .legend-lvl {
    font-family: 'VT323', monospace;
    font-size: 0.9rem;
    color: var(--s-text);
    font-weight: 600;
  }

  .legend-desc {
    color: var(--s-muted);
    margin: 0;
    line-height: 1.45;
  }
</style>

<script lang="ts">
  import { getContext } from 'svelte';
  import { translations, type Lang } from '$lib/i18n';

  const langCtx = getContext<{ current: Lang }>('lang');
  const t = $derived(translations[langCtx.current].about);
</script>

<svelte:head>
  <title>{t.meta_title}</title>
  <meta name="description" content={t.meta_desc} />
  <meta property="og:title" content={t.og_title} />
  <meta property="og:type"  content="website" />
</svelte:head>

<div class="cv">
  <!-- ── Heading ─────────────────────────────────────────────────── -->
  <header class="cv-head">
    <h1>{t.heading}</h1>
    <p class="cv-name">Ivan Matiash</p>
  </header>

  <!-- ── Personalien ─────────────────────────────────────────────── -->
  <section class="cv-section" aria-labelledby="s-personal">
    <h2 id="s-personal">{t.s_personal}</h2>
    <dl class="cv-dl">
      <div class="cv-row"><dt>{t.dt_name}</dt><dd>Ivan Matiash</dd></div>
      <div class="cv-row"><dt>{t.dt_address}</dt><dd>Jurastrasse 52, 4053 Basel</dd></div>
      <div class="cv-row"><dt>{t.dt_phone}</dt><dd>[privat]</dd></div>
      <div class="cv-row"><dt>{t.dt_email}</dt><dd>[privat]</dd></div>
      <div class="cv-row"><dt>{t.dt_birth}</dt><dd>{t.dd_birth}</dd></div>
      <div class="cv-row"><dt>{t.dt_nationality}</dt><dd>{t.dd_nationality}</dd></div>
      <div class="cv-row">
        <dt>GitHub</dt>
        <dd>
          <a href="https://github.com/klfk" target="_blank" rel="noopener noreferrer">
            github.com/klfk
          </a>
        </dd>
      </div>
    </dl>
  </section>

  <!-- ── Schulbildung ────────────────────────────────────────────── -->
  <section class="cv-section" aria-labelledby="s-edu">
    <h2 id="s-edu">{t.s_edu}</h2>
    <ul class="cv-timeline">
      <li class="cv-entry">
        <div class="cv-period">{t.edu_ims_period}</div>
        <div class="cv-detail">
          <strong>{t.edu_ims_name}</strong><br />
          {#each t.edu_ims_detail.split('\n') as line, i}
            {#if i > 0}<br />{/if}{line}
          {/each}
        </div>
      </li>
      <li class="cv-entry">
        <div class="cv-period">{t.edu_dw_period}</div>
        <div class="cv-detail">
          <strong>{t.edu_dw_name}</strong>, {t.edu_dw_detail.split('\n')[0]}<br />
          {t.edu_dw_detail.split('\n')[1]}
        </div>
      </li>
      <li class="cv-entry">
        <div class="cv-period">{t.edu_pr_period}</div>
        <div class="cv-detail">
          <strong>{t.edu_pr_name}</strong>, {t.edu_pr_detail}
        </div>
      </li>
    </ul>
  </section>

  <!-- ── Berufserfahrung ─────────────────────────────────────────── -->
  <section class="cv-section" aria-labelledby="s-work">
    <h2 id="s-work">{t.s_work}</h2>
    <ul class="cv-timeline">
      <li class="cv-entry">
        <div class="cv-period">{t.work_farm_period}</div>
        <div class="cv-detail">
          <strong>{t.work_farm_name}</strong>, {t.work_farm_detail.split('\n')[0]}<br />
          {t.work_farm_detail.split('\n')[1]}
        </div>
      </li>
      <li class="cv-entry">
        <div class="cv-period">{t.work_adobe_period}</div>
        <div class="cv-detail">
          <strong>{t.work_adobe_name}</strong>, {t.work_adobe_detail.split('\n')[0]}<br />
          {t.work_adobe_detail.split('\n')[1]}
        </div>
      </li>
    </ul>
  </section>

  <!-- ── Sprachkenntnisse ────────────────────────────────────────── -->
  <section class="cv-section" aria-labelledby="s-lang">
    <h2 id="s-lang">{t.s_lang}</h2>
    <ul class="cv-timeline">
      <li class="cv-entry"><div class="cv-period">{t.lang_uk}</div><div class="cv-detail">{t.lang_native}</div></li>
      <li class="cv-entry"><div class="cv-period">{t.lang_ru}</div><div class="cv-detail">{t.lang_native}</div></li>
      <li class="cv-entry"><div class="cv-period">{t.lang_en}</div><div class="cv-detail">{t.lang_en_level}</div></li>
      <li class="cv-entry"><div class="cv-period">{t.lang_de}</div><div class="cv-detail">{t.lang_de_level}</div></li>
      <li class="cv-entry"><div class="cv-period">{t.lang_fr}</div><div class="cv-detail">{t.lang_fr_level}</div></li>
    </ul>
  </section>

  <!-- ── Informatikkenntnisse ────────────────────────────────────── -->
  <section class="cv-section" aria-labelledby="s-it">
    <h2 id="s-it">{t.s_it}</h2>
    <p class="cv-note">
      {t.it_note} <a href="/school/skills">{translations[langCtx.current].nav.skills}</a>.
    </p>
    <ul class="cv-bullets">
      <li><strong>{t.it_solid}:</strong> Python, JavaScript, HTML/CSS, PHP, Java (OOP)</li>
      <li><strong>{t.it_deep}:</strong> C, Rust</li>
      <li><strong>{t.it_db}:</strong> MySQL, NoSQL, SQL</li>
      <li><strong>{t.it_tools}:</strong> Git, Docker, Neovim, VS Code, Svelte, Typst</li>
    </ul>
  </section>

  <!-- ── Projekte ────────────────────────────────────────────────── -->
  <section class="cv-section" aria-labelledby="s-proj">
    <h2 id="s-proj">{t.s_proj}</h2>
    <p class="cv-note">
      {t.proj_note} <a href="/school/projects">{translations[langCtx.current].nav.projects}</a>.
    </p>
    <ul class="cv-bullets">
      <li><strong>Librebooks</strong> — {t.proj_lb}</li>
      <li><strong>ivanm.xyz</strong> — {t.proj_web}</li>
      <li><strong>Typing-Tester (Terminal)</strong> — {t.proj_type}</li>
      <li><strong>Dotfiles &amp; Neovim</strong> — {t.proj_dot}</li>
    </ul>
  </section>

  <!-- ── Freizeit ────────────────────────────────────────────────── -->
  <section class="cv-section" aria-labelledby="s-leisure">
    <h2 id="s-leisure">{t.s_leisure}</h2>
    <ul class="cv-bullets">
      <li>{t.leisure_1}</li>
      <li>{t.leisure_2}</li>
      <li>{t.leisure_3}</li>
      <li>{t.leisure_4}</li>
    </ul>
  </section>

  <!-- ── Referenzen ──────────────────────────────────────────────── -->
  <section class="cv-section" aria-labelledby="s-ref">
    <h2 id="s-ref">{t.s_ref}</h2>
    <p class="cv-single">{t.ref_text}</p>
  </section>
</div>

<style>
  .cv {
    max-width: 700px;
  }

  .cv-head {
    margin-bottom: 2.5rem;
    padding-bottom: 1.25rem;
    border-bottom: 2px solid var(--s-border);
  }

  .cv-head h1 {
    font-family: 'VT323', monospace;
    font-size: 2.2rem;
    font-weight: 400;
    letter-spacing: 0.03em;
    margin: 0 0 0.2rem;
    color: var(--s-text);
  }

  .cv-name {
    color: var(--s-muted);
    font-size: 0.875rem;
    margin: 0;
    letter-spacing: 0.04em;
  }

  .cv-section {
    margin-bottom: 2.25rem;
  }

  .cv-section h2 {
    font-size: 0.63rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.16em;
    color: var(--s-muted);
    margin: 0 0 0.9rem;
    font-family: monospace;
    padding-bottom: 0.45rem;
    border-bottom: 1px solid var(--s-border);
  }

  .cv-dl {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
  }

  .cv-row {
    display: grid;
    grid-template-columns: 140px 1fr;
    gap: 0.5rem;
    padding: 0.45rem 0;
    border-bottom: 1px solid var(--s-border);
    font-size: 0.875rem;
  }

  .cv-row:last-child { border-bottom: none; }

  .cv-row dt { color: var(--s-muted); font-weight: 500; }
  .cv-row dd { margin: 0; color: var(--s-text); }

  .cv-row dd a { color: var(--s-link); text-decoration: none; }
  .cv-row dd a:hover { color: var(--s-link-hover); text-decoration: underline; }

  .cv-timeline {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
  }

  .cv-entry {
    display: grid;
    grid-template-columns: 140px 1fr;
    gap: 0.75rem;
    padding: 0.65rem 0;
    border-bottom: 1px solid var(--s-border);
    font-size: 0.875rem;
    line-height: 1.6;
  }

  .cv-entry:last-child { border-bottom: none; }

  .cv-period {
    color: var(--s-muted);
    font-size: 0.8rem;
    font-family: monospace;
    font-weight: 500;
    padding-top: 0.1rem;
    white-space: nowrap;
  }

  .cv-detail { color: var(--s-text); }
  .cv-detail strong { font-weight: 600; color: var(--s-text); }

  .cv-bullets {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    font-size: 0.875rem;
  }

  .cv-bullets li {
    padding: 0.5rem 0;
    border-bottom: 1px solid var(--s-border);
    line-height: 1.55;
    padding-left: 0.9rem;
    position: relative;
  }

  .cv-bullets li::before {
    content: '–';
    position: absolute;
    left: 0;
    color: var(--s-muted);
  }

  .cv-bullets li:last-child { border-bottom: none; }
  .cv-bullets strong { font-weight: 600; }

  .cv-note {
    font-size: 0.8rem;
    color: var(--s-muted);
    margin: 0 0 0.65rem;
  }

  .cv-note a { color: var(--s-link); text-decoration: none; }
  .cv-note a:hover { text-decoration: underline; }

  .cv-single {
    font-size: 0.875rem;
    color: var(--s-text);
    margin: 0;
    opacity: 0.75;
  }

  @media (max-width: 480px) {
    .cv-row, .cv-entry {
      grid-template-columns: 100px 1fr;
      gap: 0.5rem;
    }
    .cv-period { font-size: 0.72rem; }
  }
</style>

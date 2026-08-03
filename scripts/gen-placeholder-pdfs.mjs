/**
 * Generates minimal-but-valid placeholder PDFs for static/school/documents/.
 * Run once: node scripts/gen-placeholder-pdfs.mjs
 *
 * Each file shows "PLATZHALTER" and the document name — replace with real PDFs
 * before going live.
 */

import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

function makePDF(title, subtitle = '') {
  // Keep content ASCII-only so byte count == char count (no encoding math)
  const safeTitle    = title.replace(/[()\\äöüÄÖÜß]/g, (c) => ({
    ä:'ae', ö:'oe', ü:'ue', Ä:'Ae', Ö:'Oe', Ü:'Ue', ß:'ss',
    '(':'\\(', ')':'\\)', '\\':'\\\\',
  }[c] ?? c));
  const safeSub      = subtitle.replace(/[()\\äöüÄÖÜß]/g, (c) => ({
    ä:'ae', ö:'oe', ü:'ue', Ä:'Ae', Ö:'Oe', Ü:'Ue', ß:'ss',
    '(':'\\(', ')':'\\)', '\\':'\\\\',
  }[c] ?? c));

  const stream = [
    'BT',
    '/F1 22 Tf',
    '50 760 Td',
    '(PLATZHALTER) Tj',
    '0 -36 Td',
    '/F1 14 Tf',
    `(${safeTitle}) Tj`,
    ...(safeSub ? ['0 -22 Td', `/F1 11 Tf`, `(${safeSub}) Tj`] : []),
    '0 -28 Td',
    '/F1 10 Tf',
    '(Dieses Dokument ist ein Platzhalter.) Tj',
    '0 -16 Td',
    '(Bitte durch das echte Dokument ersetzen.) Tj',
    'ET',
  ].join('\n');

  let pdf = '';
  let offset = 0;
  const offsets = {};

  function add(s) {
    pdf += s;
    offset += s.length;
  }

  add('%PDF-1.4\n');

  offsets[1] = offset;
  add('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n\n');

  offsets[2] = offset;
  add('2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n\n');

  offsets[3] = offset;
  add(
    '3 0 obj\n' +
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842]\n' +
    '   /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>\n' +
    'endobj\n\n'
  );

  offsets[4] = offset;
  add(`4 0 obj\n<< /Length ${stream.length} >>\nstream\n${stream}\nendstream\nendobj\n\n`);

  offsets[5] = offset;
  add(
    '5 0 obj\n' +
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold\n' +
    '   /Encoding /WinAnsiEncoding >>\n' +
    'endobj\n\n'
  );

  const xrefOffset = offset;
  add('xref\n');
  add('0 6\n');
  add('0000000000 65535 f \n');
  for (let i = 1; i <= 5; i++) {
    add(String(offsets[i]).padStart(10, '0') + ' 00000 n \n');
  }

  add(`trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`);

  return pdf;
}

const FILES = [
  ['Bewerbungsschreiben_Ivan_Matiash.pdf',        'Bewerbungsschreiben',           'Ivan Matiash an Sympany Basel'],
  ['Lebenslauf_Ivan_Matiash.pdf',                 'Lebenslauf',                    'Ivan Matiash'],
  ['Modulnotenuebersicht_IMS_Ivan_Matiash.pdf',   'Modulnotenuebersicht IMS',      'Ivan Matiash'],
  ['Zeugnis_IMS_Semester1.pdf',                   'IMS Semesterzeugnis 1',         'Ivan Matiash'],
  ['Zeugnis_IMS_Semester2.pdf',                   'IMS Semesterzeugnis 2',         'Ivan Matiash'],
  ['Zeugnis_IMS_Semester3.pdf',                   'IMS Semesterzeugnis 3',         'Ivan Matiash'],
  ['Goethe_B1_Zertifikat.pdf',                    'Goethe-Zertifikat Deutsch B1',  '2023'],
  ['Schnupperlehre_Bestaetigung.pdf',             'Schnupperlehre Bestaetigung',   'Adobe Systems Schweiz'],
];

const outDir = 'static/school/documents';
mkdirSync(outDir, { recursive: true });

for (const [filename, title, subtitle] of FILES) {
  const content = makePDF(title, subtitle);
  writeFileSync(join(outDir, filename), content, 'ascii');
  console.log(`  created: ${filename}`);
}

console.log(`\nDone — ${FILES.length} placeholder PDFs written to ${outDir}/`);
console.log('Replace each file with the real document before going live.');

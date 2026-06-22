import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const bioPath = new URL('../src/lib/content/bio.json', import.meta.url);
const bio = JSON.parse(await readFile(bioPath, 'utf8'));

const sourceLanguage = bio.sourceLanguage ?? 'en';
const targetLanguage = bio.targetLanguage ?? 'de';

function sourceHash(value) {
  return createHash('sha256').update(value).digest('hex').slice(0, 12);
}

function swissGerman(value) {
  return value.replaceAll('ß', 'ss').replaceAll('ẞ', 'SS');
}

async function translate(text) {
  const libreTranslateUrl = process.env.LIBRETRANSLATE_URL;

  if (libreTranslateUrl) {
    const response = await fetch(`${libreTranslateUrl.replace(/\/$/, '')}/translate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        q: text,
        source: sourceLanguage,
        target: targetLanguage,
        format: 'text',
        api_key: process.env.LIBRETRANSLATE_API_KEY ?? undefined
      })
    });

    if (!response.ok) {
      throw new Error(`LibreTranslate failed: ${response.status} ${await response.text()}`);
    }

    const data = await response.json();
    return data.translatedText;
  }

  const url = new URL('https://api.mymemory.translated.net/get');
  url.searchParams.set('q', text);
  url.searchParams.set('langpair', `${sourceLanguage}|${targetLanguage}`);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`MyMemory translate failed: ${response.status} ${await response.text()}`);
  }

  const data = await response.json();
  return data.responseData?.translatedText;
}

let changed = false;

for (const [key, entry] of Object.entries(bio.strings)) {
  const hash = sourceHash(entry[sourceLanguage]);

  if (entry.sourceHash === hash && entry[targetLanguage]) continue;

  const translated = await translate(entry[sourceLanguage]);
  if (!translated) throw new Error(`No translation returned for ${key}`);

  entry[targetLanguage] = swissGerman(translated);
  entry.sourceHash = hash;
  changed = true;
  console.log(`translated ${key}`);
}

if (changed) {
  await writeFile(bioPath, `${JSON.stringify(bio, null, 2)}\n`);
} else {
  console.log('bio translations are already up to date');
}

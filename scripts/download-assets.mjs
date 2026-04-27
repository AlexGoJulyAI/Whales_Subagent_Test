import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const COVERS_DIR = 'public/images/covers';
mkdirSync(COVERS_DIR, { recursive: true });
mkdirSync('public/seo', { recursive: true });

const covers = [
  { url: 'https://m.media-amazon.com/images/I/51VRZVwSCRL._SL500_.jpg', file: 'what-remains.jpg' },
  { url: 'https://m.media-amazon.com/images/I/51di3h3Z8XL._SL500_.jpg', file: 'the-glass-castle.jpg' },
  { url: 'https://m.media-amazon.com/images/I/41OdvTywSWL._SL500_.jpg', file: 'mother-mary-comes-to-me.jpg' },
  { url: 'https://m.media-amazon.com/images/I/41sgcHbhVFL._SL500_.jpg', file: 'mark-twain.jpg' },
  { url: 'https://m.media-amazon.com/images/I/51FeWQg9NyL._SL500_.jpg', file: 'me-talk-pretty-one-day.jpg' },
  { url: 'https://m.media-amazon.com/images/I/41612y9frXL._SL500_.jpg', file: 'into-the-wild.jpg' },
  { url: 'https://m.media-amazon.com/images/I/41ZO3PA++ZL._SL500_.jpg', file: 'i-know-why-the-caged-bird-sings.jpg' },
  { url: 'https://m.media-amazon.com/images/I/513oKbpMTgL._SL500_.jpg', file: 'year-of-magical-thinking-play.jpg' },
  { url: 'https://m.media-amazon.com/images/I/41sEpBti5GL._SL500_.jpg', file: 'on-writing.jpg' },
  { url: 'https://m.media-amazon.com/images/I/51STuxTwGhL._SL500_.jpg', file: 'friday-afternoon-club.jpg' },
  { url: 'https://m.media-amazon.com/images/I/51mwpABeT4L._SL500_.jpg', file: 'travels-with-charley.jpg' },
  { url: 'https://m.media-amazon.com/images/I/41nuuhurTOL._SL500_.jpg', file: 'year-of-magical-thinking.jpg' },
  { url: 'https://m.media-amazon.com/images/I/51CDe0x53YL._SL500_.jpg', file: 'monsters-in-the-archives.jpg' },
  { url: 'https://m.media-amazon.com/images/I/41oS4LUawtL._SL500_.jpg', file: 'gulag-archipelago.jpg' },
  { url: 'https://m.media-amazon.com/images/I/51X85nzqk9L._SL500_.jpg', file: 'surprised-by-joy.jpg' },
  { url: 'https://m.media-amazon.com/images/I/41v0WrMrMTL._SL500_.jpg', file: 'naked.jpg' },
  { url: 'https://m.media-amazon.com/images/I/51e7EmOUi6L._SL500_.jpg', file: 'these-precious-days.jpg' },
  { url: 'https://m.media-amazon.com/images/I/41SxYzn2oRL._SL500_.jpg', file: 'dark-renaissance.jpg' },
  { url: 'https://m.media-amazon.com/images/I/61Zo+lnFU9L._SL500_.jpg', file: 'prairie-fires.jpg' },
  { url: 'https://m.media-amazon.com/images/I/41Ekrh3yMOL._SL500_.jpg', file: 'book-of-lives.jpg' },
];

const favicons = [
  { url: 'https://images-na.ssl-images-amazon.com/images/G/01/audiblemobile/store/image/favicons/icons32px.png', file: 'public/seo/favicon-32.png' },
  { url: 'https://m.media-amazon.com/images/G/01/SearchExcellence/QueryTriage/Signpost/audible.png', file: 'public/seo/audible-logo.png' },
];

async function download(url, dest) {
  try {
    const res = await fetch(url);
    if (!res.ok) { console.warn(`SKIP ${url}: ${res.status}`); return; }
    const buf = await res.arrayBuffer();
    writeFileSync(dest, Buffer.from(buf));
    console.log(`✓ ${dest}`);
  } catch (e) {
    console.warn(`ERR ${url}: ${e.message}`);
  }
}

async function batch(items, batchSize = 4) {
  for (let i = 0; i < items.length; i += batchSize) {
    await Promise.all(items.slice(i, i + batchSize).map(fn => fn()));
  }
}

await batch([
  ...covers.map(c => () => download(c.url, join(COVERS_DIR, c.file))),
  ...favicons.map(f => () => download(f.url, f.file)),
]);

console.log('Done downloading assets.');

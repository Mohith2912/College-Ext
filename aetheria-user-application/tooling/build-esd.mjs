import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const repositoryRoot = path.dirname(root);
const appRoot = path.join(root, 'apps/users');
const source = path.join(repositoryRoot, 'ESD1');
const output = path.join(appRoot, 'public/ESD1');
const appRequire = createRequire(path.join(appRoot, 'package.json'));
const require = createRequire(import.meta.url);
const { build } = createRequire(require.resolve('tsup'))('esbuild');
const tailwind = appRequire('@tailwindcss/postcss');
const postcss = createRequire(appRequire.resolve('@tailwindcss/postcss'))('postcss');
const integrity = JSON.parse(await readFile(path.join(appRoot, 'esd/source-integrity.json'), 'utf8'));
const mobileOverrides = await readFile(path.join(appRoot, 'cn-units/mobile-overrides.css'), 'utf8');

for (const [file, expected] of Object.entries(integrity.files)) {
  const content = (await readFile(path.join(source, file), 'utf8')).replace(/\r\n/g, '\n').trimEnd();
  const actual = createHash('sha256').update(content).digest('hex');
  if (actual !== expected) throw new Error(`ESD1 source changed: ${file}. Review it before updating the integrity record.`);
}

await mkdir(output, { recursive: true });
await build({
  entryPoints: [path.join(source, 'src/main.tsx')],
  outfile: path.join(output, 'app.js'),
  bundle: true,
  minify: true,
  format: 'esm',
  platform: 'browser',
  jsx: 'automatic',
  nodePaths: [path.join(appRoot, 'node_modules')],
  define: { 'process.env.NODE_ENV': '"production"' },
  plugins: [{ name: 'original-css', setup(builder) { builder.onLoad({ filter: /index\.css$/ }, () => ({ contents: '', loader: 'js' })); } }],
});

const originalCss = await readFile(path.join(source, 'src/index.css'), 'utf8');
const css = await postcss([tailwind({ base: source, optimize: true })]).process(originalCss, {
  from: path.join(appRoot, 'esd.css'),
  to: path.join(output, 'app.css'),
});
await writeFile(path.join(output, 'app.css'), `${css.css}\n${mobileOverrides}\n`);
const html = (await readFile(path.join(source, 'index.html'), 'utf8'))
  .replace('</head>', '    <link rel="stylesheet" href="./app.css" />\n  </head>')
  .replace('src="/src/main.tsx"', 'src="./app.js"');
await writeFile(path.join(output, 'index.html'), html);
console.log('Built Embedded System Design course');

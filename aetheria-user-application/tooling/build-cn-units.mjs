import { createRequire } from 'node:module';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const appRoot = path.join(root, 'apps/users');
const repositoryFolders = ['CN-Unit', 'CN-Unit-two', 'CN-Unit-3', 'CN-unit-4', 'CN-Unit-5'];
const repositoryRoot = path.dirname(root);
const appRequire = createRequire(path.join(appRoot, 'package.json'));
const require = createRequire(import.meta.url);
const { build } = createRequire(require.resolve('tsup'))('esbuild');
const tailwind = appRequire('@tailwindcss/postcss');
const postcss = createRequire(appRequire.resolve('@tailwindcss/postcss'))('postcss');
const sourceIntegrity = JSON.parse(await readFile(path.join(appRoot, 'cn-units/source-integrity.json'), 'utf8'));
const mobileOverrides = await readFile(path.join(appRoot, 'cn-units/mobile-overrides.css'), 'utf8');

// Check the originals before building any unit. Never silently ship a shortened
// or rewritten reference module. Ignore only checkout line-ending differences.
for (const [unit, { files }] of Object.entries(sourceIntegrity)) {
  for (const [file, expected] of Object.entries(files)) {
    const content = (await readFile(path.join(repositoryRoot, repositoryFolders[Number(unit) - 1], file), 'utf8'))
      .replace(/\r\n/g, '\n').trimEnd();
    const actual = createHash('sha256').update(content).digest('hex');
    if (actual !== expected) throw new Error(`Original CN Unit ${unit} file changed: ${file}. Compare with the recorded source revision before updating its integrity record.`);
  }
}

for (const unit of [1, 2, 3, 4, 5]) {
  const source = path.join(repositoryRoot, repositoryFolders[unit - 1]);
  const output = path.join(appRoot, 'public', repositoryFolders[unit - 1]);
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
    plugins: [{ name: 'original-css', setup(builder) {
      builder.onLoad({ filter: /index\.css$/ }, () => ({ contents: '', loader: 'js' }));
    } }],
  });
  // Compile each original stylesheet against only that unit's original files.
  // Separate documents prevent course styles from changing the reference UI.
  const originalCss = await readFile(path.join(source, 'src/index.css'), 'utf8');
  const css = await postcss([tailwind({ base: source, optimize: true })]).process(originalCss, {
    // Resolve installed compiler dependencies from the host project while
    // scanning the untouched source folder supplied by the user.
    from: path.join(appRoot, `cn-unit-${unit}.css`), to: path.join(output, 'app.css'),
  });
  await writeFile(path.join(output, 'app.css'), `${css.css}\n${mobileOverrides}\n`);
  const html = (await readFile(path.join(source, 'index.html'), 'utf8'))
    .replace('</head>', '    <link rel="stylesheet" href="./app.css" />\n  </head>')
    .replace('src="/src/main.tsx"', 'src="./app.js"')
    .replace('</body>', `${unit === 4 ? '<script src="./navigation.js" defer></script>' : ''}</body>`);
  if (unit === 4) await writeFile(path.join(output, 'navigation.js'), await readFile(path.join(root, 'tooling/cn-navigation.js'), 'utf8'));
  await writeFile(path.join(output, 'index.html'), html);
  console.log(`Built original Computer Networks Unit ${unit}`);
}

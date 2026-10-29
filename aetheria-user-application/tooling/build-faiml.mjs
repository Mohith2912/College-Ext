import { execSync } from 'node:child_process';
import { cp, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const repositoryRoot = path.dirname(root);
const appRoot = path.join(root, 'apps/users');
const source = path.join(repositoryRoot, 'faiml');
const dist = path.join(source, 'dist');
const output = path.join(appRoot, 'public/FAIML');

console.log('Syncing Fundamentals of Artificial Intelligence and Machine Learning course...');
if (existsSync(path.join(source, 'node_modules'))) {
  try {
    execSync('npm run build', { cwd: source, stdio: 'inherit' });
    await mkdir(output, { recursive: true });
    await cp(dist, output, { recursive: true });
  } catch (err) {
    console.warn('Local build notice, falling back to committed public/FAIML:', err.message);
  }
} else if (existsSync(output)) {
  console.log('Using prebuilt public/FAIML bundle.');
}

console.log('Built FAIML course and synced to public/FAIML');

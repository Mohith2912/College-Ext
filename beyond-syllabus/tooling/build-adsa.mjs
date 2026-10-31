import { execSync } from 'node:child_process';
import { cp, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const repositoryRoot = path.dirname(root);
const appRoot = path.join(root, 'apps/users');
const source = path.join(repositoryRoot, 'adsa');
const dist = path.join(source, 'dist');
const output = path.join(appRoot, 'public/ADSA');

console.log('Syncing Advanced Data Structures and Algorithms course...');
if (existsSync(path.join(source, 'node_modules'))) {
  try {
    execSync('npm run build', { cwd: source, stdio: 'inherit' });
    await mkdir(output, { recursive: true });
    await cp(dist, output, { recursive: true });
  } catch (err) {
    console.warn('Local build notice, falling back to committed public/ADSA:', err.message);
  }
} else if (existsSync(output)) {
  console.log('Using prebuilt public/ADSA bundle.');
}

console.log('Built ADSA course and synced to public/ADSA');


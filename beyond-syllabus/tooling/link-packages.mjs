import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const packagesDir = path.join(root, 'packages');
const targetScope = path.join(root, 'apps/users/node_modules/@beyond-syllabus');

fs.mkdirSync(targetScope, { recursive: true });

for (const pkg of ['ai', 'auth', 'database', 'ui', 'validation']) {
  const src = path.join(packagesDir, pkg);
  const dst = path.join(targetScope, pkg);
  try {
    if (fs.existsSync(dst)) {
      fs.rmSync(dst, { recursive: true, force: true });
    }
    fs.symlinkSync(src, dst, 'junction');
    console.log(`Linked @beyond-syllabus/${pkg} -> ${src}`);
  } catch (err) {
    console.error(`Failed to link ${pkg}:`, err.message);
  }
}

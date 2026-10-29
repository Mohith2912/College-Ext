import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const nodeModules = path.join(root, 'node_modules');

let fixedCount = 0;

function fixDir(dir, depth = 0) {
  if (depth > 6) return;
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    try {
      const stat = fs.lstatSync(full);
      if (stat.isSymbolicLink()) {
        const target = fs.readlinkSync(full);
        if (target.includes('aetheria-user-application')) {
          const newTarget = target.replaceAll('aetheria-user-application', 'beyond-syllabus');
          fs.rmSync(full, { force: true, recursive: true });
          fs.symlinkSync(newTarget, full, 'junction');
          fixedCount++;
        }
      } else if (stat.isDirectory()) {
        fixDir(full, depth + 1);
      }
    } catch {
      // ignore
    }
  }
}

console.log('Fixing node_modules symlinks from aetheria-user-application -> beyond-syllabus...');
fixDir(nodeModules);
console.log(`Successfully updated ${fixedCount} junctions in node_modules!`);

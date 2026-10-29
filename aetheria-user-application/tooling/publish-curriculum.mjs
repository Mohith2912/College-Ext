import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

if (process.env.VERCEL) {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  const result = spawnSync(process.execPath, ['--import', 'tsx', 'prisma/seed.ts'], {
    cwd: root,
    env: process.env,
    stdio: 'inherit',
    windowsHide: true,
  });
  if (result.status !== 0) process.exit(result.status ?? 1);
} else {
  console.log('Skipped curriculum publishing outside Vercel.');
}

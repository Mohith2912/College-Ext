import { defineConfig } from 'vitest/config';
export default defineConfig({ test: { include: ['packages/*/tests/**/*.test.ts', 'tests/unit/**/*.test.ts'], exclude: ['**/*.integration.test.ts', '**/node_modules/**'], environment: 'node' } });

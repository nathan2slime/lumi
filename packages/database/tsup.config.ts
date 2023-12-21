import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['index.ts'],
  splitting: false,
  dts: true,
  outDir: 'dist',
  format: ['cjs', 'esm'],
  skipNodeModulesBundle: true,
  sourcemap: false,
  tsconfig: 'tsconfig.json',
  clean: false,
});

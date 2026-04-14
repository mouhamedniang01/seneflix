// Learn more about Vitest configuration options at https://vitest.dev/config/
import '@angular/compiler';
import { defineConfig } from 'vitest/config';
import angular from '@analogjs/vite-plugin-angular';
import tailwindcss from '@tailwindcss/vite';
import { vitest } from 'vitest';
export default defineConfig({
  plugins: [
    tailwindcss(), //pulgin tailwindcss
    angular({tsconfig: 'tsconfig.spec.json'}), //  plugin qui permet à Vitest de comprendre Angular
  ],
  resolve: {
    mainFields: ['module', 'main'],
  },
  test: {
    globals: true,           // permet d'utiliser describe/it/expect sans import
    environment: 'jsdom',    // simule le DOM du navigateur
    setupFiles: ['src/test-providers.ts'], // fichier d'initialisation
    include: ['src/**/*.spec.ts'],     // où chercher les tests
    exclude: ['node_modules/**'],
    server: {
      deps: {
        inline: [/primeng/, /@angular/, /tailwindcss/], //  force le bundling ESM
      }
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/app/**/*.ts'],
      exclude: ['src/app/**/*.spec.ts', 'src/app/**/*.module.ts'],
      thresholds: {
        lines: 75,      // seuil minimum comme Salesforce
        functions: 75,
        branches: 75,
      }
    }
  },
});

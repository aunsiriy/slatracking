import { defineConfig } from 'vite';
import { resolve } from 'node:path';

const root = resolve(__dirname);

export default defineConfig({
  root,
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        baSlaMaster: resolve(root, 'ba-sla-master.html'),
        baStructureView: resolve(root, 'ba-structure-view.html'),
        slaOverview: resolve(root, 'sla-overview.html'),
        slaReportForm: resolve(root, 'sla-report-form.html'),
        slaReportFormLevel2: resolve(root, 'sla-report-form-level2.html'),
        slaStatusTracking: resolve(root, 'sla-status-tracking.html'),
        learningForm: resolve(root, 'learning-form.html'),
        p1p11Overview: resolve(root, 'p1-p11-overview.html'),
        qirAnnualForm: resolve(root, 'qir-annual-form.html'),
      },
    },
  },
});

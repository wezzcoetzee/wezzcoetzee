import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';

const config = [
  ...nextCoreWebVitals,
  {
    // Vendored verbatim from bilalgursen/liquid-glass; its README forbids local edits.
    ignores: ['.next/**', 'out/**', 'node_modules/**', 'src/components/liquid-glass/**'],
  },
];

export default config;

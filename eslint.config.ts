import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: [
    '**/node_modules/*',
    './src/env.d.ts',
    './scripts/*.key',
    './src/static/',
  ],
  formatters: {
    css: true,
    prettierOptions: {
      tabWidth: 2,
      singleQuote: true,
      trailingComma: 'all',
      semi: false,
      printWidth: 200,
    },
  },
  vue: true,
  typescript: true,
  rules: {
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: { max: 1 },
        multiline: { max: 1 },
      },
    ],
    'vue/component-name-in-template-casing': ['error', 'kebab-case'],
    'vue/custom-event-name-casing': ['error', 'kebab-case'],
  },
})

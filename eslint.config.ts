import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: [
    '**/node_modules/*',
    './src/env.d.ts',
    './scripts/*',
  ],
  formatters: {
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
})

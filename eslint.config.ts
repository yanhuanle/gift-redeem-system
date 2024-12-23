import antfu from '@antfu/eslint-config'

export default antfu({
  // enable UnoCSS support
  // https://unocss.dev/integrations/vscode
  unocss: true,
  jsonc: false,
  formatters: {
    css: true,
  },
  ignores: [
    'scripts/**',
    'package.rig.json5',
    '.gitlab-ci.yml',
  ],
})

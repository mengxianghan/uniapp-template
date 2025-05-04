const ci = require('miniprogram-ci')
const { readJsonAsync } = require('../utils.js')

const manifest = readJsonAsync('./src/manifest.json')

const appid = manifest['mp-weixin'].appid

const project = new ci.Project({
  appid,
  type: 'miniProgram',
  projectPath: './dist/build/mp-weixin',
  privateKeyPath: `./scripts/mp-weixin/private.${appid}.key`,
  ignores: ['node_modules/**/*', 'scripts/**/*'],
})

const baseSetting = {
  es6: true,
  minifyWXSS: true,
  minifyJS: true,
  minifyWXML: true,
  useProjectConfig: true,
}

module.exports = {
  ci,
  project,
  baseSetting,
}

const fs = require('node:fs')
const pkg = require('../package.json')

function readJsonAsync(path) {
  return JSON.parse(fs.readFileSync(path, 'utf-8')
    // 过滤 json 文件中的注释
    .replace(/^\s*\/\/.*$/gm, '')
    .replace(/\/\*[\s\S]*?\*\//g, ''))
}

module.exports = {
  readJsonAsync,
  version: pkg.version,
}

const process = require('node:process')
const consola = require('consola')
const { version } = require('../utils')
const { ci, project, baseSetting } = require('./config')
const { log } = require('./log')

consola.start('正在上传…')
ci.upload({
  project,
  version,
  desc: `环境：${process.env.APP_ENV}；版本：v${version}`,
  setting: {
    ...baseSetting,
  },
  onProgressUpdate: console.log,
  robot: 1,
}).then((result) => {
  log(result)
  consola.success('上传完成')

  process.exit()
})

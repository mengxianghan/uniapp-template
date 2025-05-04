const consola = require('consola')
const { ci, project, baseSetting } = require('./config')
const { log } = require('./log')
const { version } = require('../utils')

  (async () => {
    consola.start('正在上传…')
    const result = await ci.upload({
      project,
      version: version,
      desc: `环境：${process.env.APP_ENV}；版本：v${version}`,
      setting: {
        ...baseSetting,
      },
      onProgressUpdate: console.log,
      robot: 1,
    })

    log(result)
    consola.success('上传完成')

    process.exit()
  })()

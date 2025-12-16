const Table = require('cli-table3')
const consola = require('consola')
const { partial } = require('filesize')

const size = partial({ base: 1024, standard: 'jedec' })

function log(result) {
  consola.info('包信息')
  const packageTable = new Table({
    head: ['包名', '大小'],
  })
  for (const item of result.subPackageInfo.sort((a, b) => b.size - a.size)) {
    packageTable.push([item.name, size(item.size)])
  }
  console.table(packageTable.toString())

  if (result.pluginInfo.length) {
    consola.info('插件信息')
    const pluginTable = new Table({
      head: ['appid', '版本', '大小'],
    })
    for (const item of result.pluginInfo.sort((a, b) => b.size - a.size)) {
      pluginTable.push([item.pluginProviderAppid, item.version, size(item.size)])
    }
    console.table(pluginTable.toString())
  }
}

function onProgressUpdate(task) {
  const status = {
    doing: 'start',
    done: 'success',
    fail: 'fail',
    warn: 'warn',
    info: 'info',
  }

  consola[status[task.status]](`[${task.id}] ${task.message}`)
}

module.exports = {
  log,
  onProgressUpdate,
}

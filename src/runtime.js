/**
 * File System Module
 */
const fs = require('fs')

/**
 * This callback is returns errors
 * @callback runtimeCallback
 * @param {String} err
 * @param {Function} func
 */

/**
 * Arrow Lanugage Runtime
 * @param {String} filepath Path to .arr File
 * @param {runtimeCallback} cb callback
 */
function runtime (filepath, cb) {
  if (!fs.existsSync(filepath)) {
    cb(new Error(filepath + ' is non-exist or not a file.'))
  } else {
    fs.readFile(filepath, (err, data) => {
      if (err) cb(err)
      data = data.toString('utf-8')

      // eslint-disable-next-line no-unused-vars
      let converted = ''
      let linebyline = data.split('\n')
      for (let PC = 0; PC < linebyline.length; PC++) {
        const line = linebyline[PC].split('=>')[0]
        const lineArr = line.split('<-')
        const cmd = lineArr[0] ? lineArr[0].trim().toLowerCase() : ''
        const arg0 = lineArr[1] ? lineArr[1].trim() : ''

        switch (cmd) {
          case 'modl':
            fs.readFile(arg0, (moErr, moData) => {
              if (moErr) cb(moData)
              moData = moData.toString('utf-8')
              linebyline[PC] = ''
              linebyline = moData.split('\n').concat(linebyline)
              PC = (-1)
            })
            break

          case 'con':
            converted += 'console.log(' + arg0 + ')'
            break

          case 'con.err':
            converted += 'console.error(' + arg0 + ')'
            break

          case 'con.dir':
            converted += 'console.dir(' + arg0 + ')'
            break

          case 'exit':
            converted += 'return ' + arg0
            break

          case 'if':
            converted += 'if (' + arg0 + ') {'
            break

          default:
            if (cmd && arg0) {
              converted += 'let ' + cmd + ' = ' + arg0
            }
            break
        }
        if (line.endsWith('->')) converted += '}'
        converted += '\n'
      }
      // eslint-disable-next-line no-new-func
      converted = new Function(converted)
      cb(null, converted)
    })
  }
}

/**
 * @param {String} data
 */
function wtfRuntime (filepath, cb) {
  if (!fs.existsSync(filepath)) {
    cb(new Error(filepath + ' is non-exist or not a file.'))
  } else {
    fs.readFile(filepath, (err, data) => {
      if (err) cb(err)
      data = data.toString('utf-8')
      let point = 0

      /**
       * memory
       * @type {Array<Number>}
       */
      const memory = []
      data = data.split('\n').join(' ')
      data.split(' ').forEach((cnt) => {
        switch (cnt.trim()) {
          case '^+':
            point++
            break

          case '^-':
            point--
            break

          case '<+':
            if (!memory[point]) memory[point] = 0
            memory[point]++
            break

          case '<-':
            if (!memory[point]) memory[point] = 0
            memory[point]--
            break

          case '<+=':
            if (!memory[point]) memory[point] = 0
            memory[point] += memory[point]
            break

          case '<-=':
            if (!memory[point]) memory[point] = 0
            memory[point] -= memory[point]
            break

          case '<*=':
            if (!memory[point]) memory[point] = 0
            memory[point] *= memory[point]
            break

          case '</=':
            if (!memory[point]) memory[point] = 0
            memory[point] /= memory[point]
            break

          case '<+^':
            if (!memory[point]) memory[point] = 0
            memory[point] += memory[point - 1]
            break

          case '<+_':
            if (!memory[point]) memory[point] = 0
            memory[point] += memory[point + 1]
            break

          case '<-^':
            if (!memory[point]) memory[point] = 0
            memory[point] -= memory[point - 1]
            break

          case '<-_':
            if (!memory[point]) memory[point] = 0
            memory[point] -= memory[point + 1]
            break

          case '<*^':
            if (!memory[point]) memory[point] = 0
            memory[point] *= memory[point - 1]
            break

          case '<*_':
            if (!memory[point]) memory[point] = 0
            memory[point] *= memory[point + 1]
            break

          case '</^':
            if (!memory[point]) memory[point] = 0
            memory[point] /= memory[point - 1]
            break

          case '</_':
            if (!memory[point]) memory[point] = 0
            memory[point] /= memory[point + 1]
            break

          case '->':
            if (!memory[point]) memory[point] = 0
            console.log(memory[point])
            break

          case '=>':
            if (!memory[point]) memory[point] = 0
            console.log(String.fromCharCode(memory[point]))
            break

          case ']':
            cb(null)
            break

          default:
            break
        }
      })
    })
  }
}

exports.runtime = runtime
exports.wtfRuntime = wtfRuntime

#!/bin/node

/**
 * @name Arrow-Runtime
 * @description Arrow Language Runtime, based on javascript
 * @author The Arrow Team / PMH, NamuTree0345, noamboy2006, ttakkku
 * @license MIT
 * @see https://github.com/orgs/the-arrow-language
 * @copyright (c) 2019 The Arrow Team. MIT Licensed.
 */

'use strict'

if (process.argv.includes('-v') || process.argv.includes('--version')) {
  console.log('Arrow-Runtime v' + require('./package.json').version)
} else if (process.argv.includes('-h') || process.argv.includes('--help') || !process.argv[2]) {
  console.log(`Arrow-Runtime v${require('./package.json').version}

Usage: arrow [Options] filename

Options:
-h, --help      Print This Message
-v, --version   Show Version of Arrow Language Runtime`)
} else {
  if (process.argv[2].endsWith('.arr')) {
    const runtime = require('./src/runtime')
    runtime.runtime(process.argv[2], (err, func) => {
      if (err) {
        console.error(err)
        process.exit(1)
      } else {
        process.exit(func())
      }
    })
  } else if (process.argv[2].endsWith('.arrf')) {
    const runtime = require('./src/runtime')
    runtime.wtfRuntime(process.argv[2], (err) => {
      if (err) {
        console.error(err)
        process.exit(1)
      } else {
        process.exit(0)
      }
    })
  } else {
    console.log('.' + process.argv[2].split('.')[process.argv[2].split('.').length - 1] + ' is not a Arrow Language File')
  }
}

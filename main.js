#! /usr/bin/env node

const { exec } = require('child_process')

const arg = process.argv[2]

exec('vagrant global-status', (error, data) => {
  if (error) {
    process.stderr.write(error)
  } else {
    try {
      const info = data.split('\n').find(line => line.includes(arg))

      if (!info) {
        process.stderr.write(`${arg} is not a valid Vagrant machine id/name.`)
        process.exit(1)
      }

      const words = info.split(' ').filter(x => !!x)
      process.stdout.write(words[words.length - 1])
    } catch (e) {
      process.stderr.write(e.message)
    }
  }
})

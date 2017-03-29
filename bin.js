#!/usr/bin/env node

const {
  init,
  encrypt,
  decrypt
} = require('.')

var argv = require('yargs')
  .command({
    command: 'init <password>',
    aliases: ['i'],
    desc: 'Initialize password',
    handler: (argv) => {
      init(argv.password)
    }
  })
  .command({
    command: 'encrypt <file>',
    aliases: ['e'],
    desc: 'Encrypt file',
    handler: (argv) => {
      encrypt(argv.file)
    }
  })
  .command({
    command: 'decrypt <file>',
    aliases: ['d'],
    desc: 'Decrypt file',
    handler: (argv) => {
      decrypt(argv.file)
    }
  })
  .demandCommand(1)
  .help()
  .argv

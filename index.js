#!/usr/bin/env node

const path = require('path')
const vorpal = require('vorpal')()
const chalk = vorpal.chalk

const useCommand = name => {
  vorpal.use(require(path.join(__dirname, 'commands', name)))
}

useCommand('init')
useCommand('encrypt')
useCommand('decrypt')

vorpal
  .delimiter(chalk.magenta('sekret~$'))

vorpal.show()

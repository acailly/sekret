const fs = require('fs-extra')

const path = require('path')
const {
  keyfile,
  generateKey,
  addToGitIgnore
} = require(path.join(__dirname, '..', 'sekret'))

const handleInit = (password, callback) => {
  console.log(`🔍 Add .sekret to .gitignore`)
  addToGitIgnore('.sekret')

  if (fs.existsSync(keyfile)) {
    console.log('🍺 Sekret is already configured for this repository! 🍺')
    return
  }

  console.log(`🔑 Generate the key`)
  generateKey(password)

  callback()
}

module.exports = function (vorpal) {
  vorpal
   .command('init <password>')
   .description('Initialize password')
   .action(function (args, callback) {
     handleInit(args.password, callback)
     callback()
   })
}

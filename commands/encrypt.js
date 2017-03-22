
const path = require('path')
const {
  encryptFile,
  addToGitIgnore,
  checkRepositoryIsConfigured
} = require(path.join(__dirname, '..', 'sekret'))

const handleEncrypt = (file, callback) => {
  checkRepositoryIsConfigured()

  console.log(`🔍 Add ${file} to .gitignore`)
  addToGitIgnore(file)

  console.log(`🔒 Encrypt ${file} to ${file}.sekret`)
  encryptFile(file)

  callback()
}

module.exports = function (vorpal) {
  vorpal
   .command('encrypt <file>')
   .description('Encrypt a file')
   .action(function (args, callback) {
     handleEncrypt(args.file, callback)
     callback()
   })
}

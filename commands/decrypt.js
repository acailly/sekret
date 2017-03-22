
const path = require('path')
const {
  decryptFile,
  checkRepositoryIsConfigured
} = require(path.join(__dirname, '..', 'sekret'))

const handleDecrypt = (file, callback) => {
  checkRepositoryIsConfigured()

  console.log(`🔮 Decrypt ${file}.sekret to ${file}`)
  decryptFile(file)

  callback()
}

module.exports = function (vorpal) {
  vorpal
   .command('decrypt <file>')
   .description('Decrypt a file')
   .action(function (args, callback) {
     handleDecrypt(args.file, callback)
     callback()
   })
}

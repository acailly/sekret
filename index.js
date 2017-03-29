const fs = require('fs-extra')
const {
  keyfile,
  generateKey,
  addToGitIgnore,
  checkRepositoryIsConfigured,
  encryptFile,
  decryptFile
} = require('./sekret')

const init = password => {
  console.log(`🔍 Add .sekret to .gitignore`)
  addToGitIgnore('.sekret')

  if (fs.existsSync(keyfile)) {
    console.log('🍺 Sekret is already configured for this repository! 🍺')
    return
  }

  console.log(`🔑 Generate the key`)
  generateKey(password)
}

const encrypt = file => {
  checkRepositoryIsConfigured()

  console.log(`🔍 Add ${file} to .gitignore`)
  addToGitIgnore(file)

  console.log(`🔒 Encrypt ${file} to ${file}.sekret`)
  encryptFile(file)
}

const decrypt = file => {
  checkRepositoryIsConfigured()

  console.log(`🔮 Decrypt ${file}.sekret to ${file}`)
  decryptFile(file)
}

module.exports = {
  init,
  encrypt,
  decrypt
}

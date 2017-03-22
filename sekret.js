const fs = require('fs-extra')
const findRoot = require('find-root')
const crypto = require('crypto')
const path = require('path')

const appDir = path.join(findRoot(__dirname), '/')
const keyfile = appDir + '.sekret'

const gitIgnoreFile = appDir + '.gitignore'

const hash = (data) => {
  const hash = crypto.createHash('sha256')
  hash.update(data)
  return hash.digest('hex')
}

const encryptSym = (data, key) => {
  const cipher = crypto.createCipher('aes192', key)

  let encrypted = cipher.update(data, 'utf8', 'hex')
  encrypted += cipher.final('hex')

  return encrypted
}

const decryptSym = (data, key) => {
  const decipher = crypto.createDecipher('aes192', key)

  let decrypted = decipher.update(data, 'hex', 'utf8')
  decrypted += decipher.final('utf8')

  return decrypted
}

const getKey = () => {
  checkRepositoryIsConfigured()
  const dataPrivateKey = fs.readFileSync(keyfile, 'utf8')
  return dataPrivateKey
}

const generateKey = (password) => {
  const hashedPassword = hash(password)
  fs.writeFileSync(keyfile, hashedPassword, 'utf8')
}

const encryptFile = (file) => {
  const dataPrivateKey = getKey()
  const fileContent = fs.readFileSync(file, 'utf8')
  const encryptedContent = encryptSym(fileContent, dataPrivateKey)
  fs.writeFileSync(file + '.sekret', encryptedContent, 'utf8')
}

const decryptFile = (file) => {
  const decryptedContent = readFile(file)
  fs.writeFileSync(file, decryptedContent, 'utf8')
}

const readFile = (file) => {
  const dataPrivateKey = getKey()
  const encryptedFileContent = fs.readFileSync(file + '.sekret', 'utf8')
  const decryptedContent = decryptSym(encryptedFileContent, dataPrivateKey)
  return decryptedContent
}

const addToGitIgnore = (pattern) => {
  let alreadyExists = false

  if (fs.existsSync(gitIgnoreFile)) {
    const gitIgnoreContent = fs.readFileSync(gitIgnoreFile)
    alreadyExists = gitIgnoreContent.includes(pattern)
  }

  if (!alreadyExists) {
    fs.appendFileSync(gitIgnoreFile, pattern + '\n')
  }
}

const checkRepositoryIsConfigured = () => {
  if (!fs.existsSync(keyfile)) {
    throw 'The repository is not configured for sekret, run sekret --init <password>'
  }
}

module.exports = {
  keyfile,
  hash,
  encryptSym,
  decryptSym,
  getKey,
  generateKey,
  encryptFile,
  decryptFile,
  readFile,
  addToGitIgnore,
  checkRepositoryIsConfigured
}

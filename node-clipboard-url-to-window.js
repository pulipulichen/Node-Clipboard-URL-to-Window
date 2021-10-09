const { exec } = require("child_process")
const fs = require('fs')
const path = require('path')
const openExplorer = require('open-file-explorer')

if (fs.existsSync('./config.js') === false) {
  fs.copyFileSync('./config.example.js', './config.js')
}

const config = require('./config.js')

// ----------------
const clipboardy = require('clipboardy');

let url = clipboardy.readSync();
let type = false

// ----------------------

try {
  new URL(url)
  type = 'url'
} 
catch (e) {}

if (type === 'url') {
  let chromePath = config.chromePath
  exec(`'${chromePath}' --app='${url}'`, (error, stdout, stderr) => {})
}

// ----------------------

fs.writeFileSync('./log.txt', url + ' ' + fs.existsSync(url))


if (fs.existsSync(url)) {
  if (fs.lstatSync(url).isDirectory() === false) {
    url = path.dirname(url)
  }
  openExplorer(url, () => {})
} 

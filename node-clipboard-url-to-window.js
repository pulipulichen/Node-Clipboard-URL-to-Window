const { exec } = require("child_process");
const fs = require('fs')

fs.writeFileSync('./log.txt', '1')

if (fs.existsSync('./config.js') === false) {
  fs.copyFileSync('./config.example.js', './config.js')
}

fs.writeFileSync('./log.txt', '2')

const config = require('./config.js')

let chromePath = config.chromePath

fs.writeFileSync('./log.txt', '3')

// ----------------
const clipboardy = require('clipboardy');

let url = clipboardy.readSync();
let isURL = false

fs.writeFileSync('./log.txt', '4')

try {
  new URL(url)
  isURL = true
} 
catch (e) {}

fs.writeFileSync('./log.txt', '5')

if (isURL) {
  exec(`'${chromePath}' --app='${url}'`, (error, stdout, stderr) => {})
}

fs.writeFileSync('./log.txt', new Date() + ' ' + url)
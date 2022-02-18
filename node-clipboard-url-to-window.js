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


function main () {
  
  let url = clipboardy.readSync()
  
  let forceNewTab = false
  if (fs.existsSync('./last.txt') && url === fs.readFileSync('./last.txt', 'utf8')) {
    forceNewTab = true
  }
  fs.writeFileSync('./last.txt', url)
  
  let type = false

  // ----------------------

  if (forceNewTab === false) { 
    try {
      new URL(url)
      type = 'url'
    } 
    catch (e) {}
  }

  console.log(forceNewTab, type, url, fs.readFileSync('./last.txt', 'utf8'))

  if (type === 'url') {
    let chromePath = config.chromePath
    let command = `"${chromePath}" --app=${url}`
    console.log(command)
    exec(command, (error, stdout, stderr) => {})
    return true
  }

  // ----------------------

  //fs.writeFileSync('./log.txt', url + ' ' + fs.existsSync(url))

  if (fs.existsSync(url)) {
    if (fs.lstatSync(url).isDirectory() === false) {
      url = path.dirname(url)
    }
    openExplorer(url, () => {})
  } 
  else {
    // 單純開啟Chrome
    let chromePath = config.chromePath
    let command = `"${chromePath}"`
    exec(command, (error, stdout, stderr) => {})
  }
}

main()
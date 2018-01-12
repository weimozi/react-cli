#!/usr/bin/env node

const program = require('commander');
const exists = require('fs').existsSync
const path = require('path')
const home = require('user-home')
const inquirer = require('inquirer')
// const rm = require('rimraf').sync
const download = require('download-git-repo')
const logger = require('../lib/logger')
const generate = require('../lib/generate')

/**
 *
 */
program
  .usage('<tempalte-name> [project-name]')
  .option('-c, --clone', 'use git clone')
  .option('--offline', 'use cached template')
/**
 * 自定义帮助信息
 */
program.on('--help', ()=>{
  console.log('失败了哦');
})

help()

function help(){
  program.parse(process.argv)
  if(program.args.length < 1){
    return program.help()
  }
}

/**
 * Settings.
 */
const rawName = program.args[0];
const inPlace = !rawName || rawName === '.'
const name = inPlace ? path.relative('../', process.cwd()) : rawName
const to = path.resolve(rawName || '.')//project 地址
const clone = program.clone || false
const tmp = path.join(home, '.react-templates')

console.log()
process.on('exit', () => {
  console.log('监听到退出事件了')
})

console.log(exists(to), 'exists(to)')
// to 在本地是否存在
if(exists(to)){
  console.log('234234')
  inquirer.prompt([{
    type:'confirm',
    message: inPlace
      ? 'Generate project in current directory?'
      : 'Target directory exists. Continue?',
    name: 'ok',
  }]).then(answers => {
    if(answers.ok){
      run();
    }
  }).catch(
    console.log('创建project的时候出错啦')
  )
} else{
  run();
}

function run(){
  const officialTemplate = 'reactjs-templates/'
  downloadAndGenerate(officialTemplate)
}

function downloadAndGenerate(template){
  console.log(template, tmp, '24323', clone)
  download('vuejs-templates/webpack', tmp, { clone: true }, function (err) {
    if (err) logger.fatal('Failed to download repo ' + template + ': ' + err.message.trim())
    if (err) console.log('Failed to download repo ' + template + ': ' + err.message.trim())
    generate(name, tmp, to, err => {
      if (err) logger.fatal(err)
      console.log()
      logger.success('Generated "%s".', name)
    })
  })
}

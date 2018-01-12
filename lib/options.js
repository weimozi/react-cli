/**
 * Created by liusiyun on 2018/1/12.
 */

const path = require('path')
const metadata = require('read-metadata')
const exists = require('fs').existsSync
/**
 *
 * @param name project name
 * @param dir  template local address
 */
module.exports = function options(name, dir){
  const opts = getMetadata(dir)
}

function getMetadata(dir){
  const json = path.join(dir, 'meta.json')
  const js = path.join(dir, 'meta.js')
  let opts = {}

  console.log()
  console.log()
  console.log()

  console.log(json, 'json@@@@@@@@')
  console.log()
  console.log(js, 'js@@@@@@@@')
  console.log()
  console.log()

  if(exists(json)){
    // 返回的是什么信息？
    opts = metadata.sync(json)
  }else if(exists(js)){
    const req =require(path.resolve(js))
    if(req !== Object(req)){
      throw new Error ('meta.js needs to expose an object')
    }
    opts = req
  }
  return opts
}

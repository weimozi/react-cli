/**
 * Created by liusiyun on 2018/1/12.
 */

const getOptions = require('./options.js')
/**
 * Generate
 * @param name project name
 * @param src  tempalte 本地地址
 * @param dest project 目录地址
 * @param done
 */
module.exports = function generate(name, src, dest, done) {
  const opts = getOptions(name, src)

}

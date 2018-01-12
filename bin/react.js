#!/usr/bin/env node

require('commander')
  .version(require('../package.json').version)
  .usage('command [options]')
  .command('init', 'generate a new project from a template')
  .parse(process.argv)

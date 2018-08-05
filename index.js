const fs = require('fs')
const readline = require('readline')
const arg = require('arg')

const { transform, findDelimiter } = require('./csv-utils')

const args = arg({
  '--input': String,
  '--output': String,
  '--delimiter': String,

  '-i': '--input',
  '-o': '--output'
})

const rl = readline.createInterface({
  input: fs.createReadStream(args['--input']),
  output: fs.createWriteStream(args['--output']),
  crlfDelay: Infinity
})

let delimiter = args['--delimiter']

rl.on('line', line => {
  if (!delimiter) {
    delimiter = findDelimiter(line)
  }

  rl.output.write(transform(line, delimiter))
})

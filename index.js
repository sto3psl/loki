const fs = require('fs')
const os = require('os')
const readline = require('readline')

const transform = require('./csv-transform')

const writeStream = fs.createWriteStream(process.argv[3])

const rl = readline.createInterface({
  input: fs.createReadStream(process.argv[2]),
  output: writeStream,
  crlfDelay: Infinity
})

rl.on('line', line => {
  rl.output.write(transform(line))
})

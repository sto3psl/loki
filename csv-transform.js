const inputDelimiter = ';'
const outputDelimiter = ','

function transform (record) {
  const result = record
    .split(inputDelimiter)
    .map(field => {
      return field.includes(outputDelimiter) ? JSON.stringify(field) : field
    })
    .join(outputDelimiter)
  
  return `${result}\r\n`
}

module.exports = transform

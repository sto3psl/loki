const parseNumber = require('parse-decimal-number')

const semicolon = ';'
const comma = ','

/**
 * Guess the delimiter of the given record.
 *
 * @param {String} record CSV Record
 * @returns {String} delimiter
 */
function findDelimiter (record) {
  const counts = Array.from(record).reduce(
    (count, char) => {
      if (char === semicolon) {
        count[semicolon]++
      }

      if (char === comma) {
        count[comma]++
      }

      return count
    },
    { [semicolon]: 0, [comma]: 0 }
  )

  return counts[semicolon] > counts[comma] ? semicolon : comma
}

/**
 * Get how many fields the given record has.
 *
 * @param {String} record CSV Record
 * @param {String} delimiter Delimiter of the record
 * @returns {number} Record length
 */
function getRecordLength (record, delimiter) {
  return record.split(delimiter).length
}

/**
 * Tries to find a valid number representing the given input string.
 *
 * @param {String} field
 * @returns {number}
 */
function getNumber (field) {
  return parseNumber(field) || parseNumber(field, '.,')
}

/**
 * Transform a CSV Record and change it's delimiter
 *
 * @param {String} record CSV Record
 * @param {String} inputDelimiter Delimiter of the record
 * @param {String} [outputDelimiter=comma] Delimiter of the output
 * @returns {String} CSV Record
 */
function transform (record, inputDelimiter, outputDelimiter = comma) {
  const result = record
    .split(inputDelimiter)
    .map(field => {
      const value = getNumber(field) || field
      return value.toString().includes(outputDelimiter) ? JSON.stringify(value) : value
    })
    .join(outputDelimiter)

  return `${result}\r\n`
}

module.exports = {
  findDelimiter,
  getRecordLength,
  transform
}

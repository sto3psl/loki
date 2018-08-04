import test from 'ava'

import transform from './csv-transform'

test('Each record ends with a line break', t => {
  const result = transform('\naaa;bbb;ccc')
  t.true(result.slice(-2) === '\r\n')
})

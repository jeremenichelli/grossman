import test from 'ava'
import calculateVectorLength from './vector-length'

test('returns vectors module', (t) => {
  const testVector = [ 1, -2, 2]

  t.deepEqual(calculateVectorLength(testVector), 3)
})

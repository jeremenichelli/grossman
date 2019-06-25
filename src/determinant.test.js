import test from 'ava'
import determinant from './determinant'

test('calculates determinant of a matrix correctly', (t) => {
  const testMatrix = [
    [ 2, 4, 0, -10],
    [1, 5, 0, 20],
    [-4, 1, 0.5, 30],
    [0, 0, 0, 1]
  ]

  t.is(determinant(testMatrix), 3)
})
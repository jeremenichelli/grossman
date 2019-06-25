import test from 'ava'
import normalizeMatrix from './normalize-matrix'

test('calculates determinant of a matrix correctly', (t) => {
  const testMatrix = [
    [ 2, 4, 0, -10],
    [1, 5, 0, 20],
    [-4, 1, 0.5, 30],
    [0, 0, 0, 1]
  ]

  const expectedMatrix = [
    [ 2/3, 4/3, 0, -10/3],
    [1/3, 5/3, 0, 20/3],
    [-4/3, 1/3, 0.5/3, 30/3],
    [0, 0, 0, 1/3]
  ]

  t.deepEqual(normalizeMatrix(testMatrix), expectedMatrix)
})
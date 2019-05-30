import test from 'ava'
import multiply from '../src/helpers/multiply'
import {identity} from '../src/helpers/constants'

test('multiplies matrices with same number of rows and columns', (t) => {
  const testMatrix = [
    [5, 2, 3, -1],
    [10, 0, 6, 7],
    [9, 1, -2, 0],
    [7, -6, 1, 9],
  ]

  const factorMatrix = [
    [4, -1, 0, 9],
    [2, 16, -9, 1],
    [0, 6, 4, 2],
    [8, 3, -5, 6],
  ]

  const expectedMatrix = [
    [16, 42, -1, 47],
    [96, 47, -11, 144],
    [38, -5, -17, 78],
    [88, -70, 13, 113],
  ]

  t.deepEqual(multiply(testMatrix, factorMatrix), expectedMatrix)
})

test('multiplies matrices with different number of rows and columns', (t) => {
  const testMatrix = [
    [1, 0, -2, 4],
  ]

  const factorMatrix = [
    [5, 0],
    [2, -4],
    [0, 1],
    [3, 8],
  ]

  const expectedMatrix = [
    [17, 30],
  ]

  t.deepEqual(multiply(testMatrix, factorMatrix), expectedMatrix)
})

test('multiplications with identity matrix do not alter the factor', (t) => {
  const testMatrix = [
    [2, 5, 6, 1],
    [4, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 5, 1],
  ]

  t.deepEqual(multiply(testMatrix, identity), testMatrix)
  t.deepEqual(multiply(identity, testMatrix), testMatrix)
})

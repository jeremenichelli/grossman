import test from 'ava'
import { Matrix } from '.'
import { identity } from './constants'

test('toString returns 3d matrix representation', (t) => {
  const testMatrix = [
    [5, 2, 3, -1],
    [10, 0, 6, 7],
    [9, 1, -2, 0],
    [7, -6, 1, 9]
  ]
  const expectedString = 'matrix3d(5,10,9,7,2,0,1,-6,3,6,-2,1,-1,7,0,9)'
  const matrix = new Matrix(testMatrix)

  t.is(matrix.toString(), expectedString)
})

test('scaleTo generates correct 3d matrix result', (t) => {
  const expectedString = 'matrix3d(2,0,0,0,0,1,0,0,0,0,0.5,0,0,0,0,1)'
  const matrix = new Matrix(identity)
  const result = matrix.scaleTo(2, 1, 0.5).toString()

  t.is(result, expectedString)
})

test('translateTo generates correct 3d matrix result', (t) => {
  const expectedString = 'matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,100,-20,30,1)'
  const matrix = new Matrix(identity)
  const result = matrix.translateTo(100, -20, 30).toString()

  t.is(result, expectedString)
})

test('rotateTo generates correct 3d matrix result', (t) => {
  const expectedString =
    'matrix3d(0.766044,0.642788,0,0,-0.642788,0.766044,0,0,0,0,1,0,0,0,0,1)'
  const matrix = new Matrix(identity)
  const result = matrix.rotateTo(40).toString()

  t.is(result, expectedString)
})

test('skewTo generates correct 3d matrix result', (t) => {
  const expectedString =
    'matrix3d(1,0.36397,0,0,0.176327,1,0,0,0,0,1,0,0,0,0,1)'
  const matrix = new Matrix(identity)
  const result = matrix.skewTo(10, 20).toString()

  t.is(result, expectedString)
})

test('decompose returns object with correct transform state', (t) => {
  const matrix = new Matrix([
    [0.732465, -0.514965, 0, 10], [1.83062, 1.93261, 0, 20], [0, 0, 3, -35], [0, 0, 0, 1]
  ])
  const result = matrix.decompose()

  t.deepEqual(result, {
    translate: [ 10, 20, -35],
    scale: [1.2, 2.1, 3],
    rotation: [35],
    skew: [10, 20]
  })
})

import test from 'ava'
import sinon from 'sinon'
import { getMatrixFromElement } from '.'

test.beforeEach(() => {
  // mock computed style method
  global.getComputedStyle = sinon.stub()
})

test.afterEach(() => {
  global.getComputedStyle.reset()
})

test('returns identity transform matrix when element has no transformations', (t) => {
  global.getComputedStyle.returns({ transform: 'none' })
  const matrix = getMatrixFromElement({})
  t.is(matrix.toString(), 'matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)')
})

test('returns correct matrix when element has 2d transformations', (t) => {
  const transform = 'matrix(-1.40954, 0.51303, -0.51303, -1.40954, 0, 0)'
  global.getComputedStyle.returns({ transform })
  const matrix = getMatrixFromElement({})
  t.is(
    matrix.toString(),
    'matrix3d(-1.40954,0.51303,0,0,-0.51303,-1.40954,0,0,0,0,1,0,0,0,0,1)'
  )
})

test('returns correct matrix when element has 3d transformations', (t) => {
  const transform =
    'matrix3d(1.5, 0, 0, 0, 0, 1.5, 0, 0, 0, 0, 1, 0, 10, -20, 30, 1)'
  global.getComputedStyle.returns({ transform })
  const matrix = getMatrixFromElement({})
  t.is(matrix.toString(), 'matrix3d(1.5,0,0,0,0,1.5,0,0,0,0,1,0,10,-20,30,1)')
})

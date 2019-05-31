import multiply from './multiply'

function getMatrixString(matrix) {
  // transpose matrix and trim spaces manually to
  // avoid extra memory allocations
  return `matrix3d(
    ${matrix[0][0]},${matrix[1][0]},${matrix[2][0]},${matrix[3][0]},
    ${matrix[0][1]},${matrix[1][1]},${matrix[2][1]},${matrix[3][1]},
    ${matrix[0][2]},${matrix[1][2]},${matrix[2][2]},${matrix[3][2]},
    ${matrix[0][3]},${matrix[1][3]},${matrix[2][3]},${matrix[3][3]}
  )`.replace(/[\s\t\n]/g, '')
}

function getScaleMatrix(x, y, z) {
  return [[x, 0, 0, 0], [0, y, 0, 0], [0, 0, z, 0], [0, 0, 0, 1]]
}

function getTranslateMatrix(x, y, z) {
  return [[1, 0, 0, x], [0, 1, 0, y], [0, 0, 1, z], [0, 0, 0, 1]]
}

function getSkewMatrix(alpha, beta) {
  const alphaInRadians = (Math.PI * alpha) / 180
  const betaInRadians = (Math.PI * beta) / 180
  // fixing decimals to six, as most browsers do
  const alphaTan = Math.tan(alphaInRadians).toFixed(6)
  const betaTan = Math.tan(betaInRadians).toFixed(6)

  return [[1, alphaTan, 0, 0], [betaTan, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]
}

function getRotateMatrix(alpha) {
  const angleInRadians = (Math.PI * alpha) / 180
  // fixing decimals to six, as most browsers do
  const cos = Math.cos(angleInRadians).toFixed(6)
  const sin = Math.sin(angleInRadians).toFixed(6)

  return [[cos, -sin, 0, 0], [sin, cos, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]
}

/**
 * Builds a matrix for later transform manipulation
 * @constructor matrix
 * @param {Array} matrixRepresentation - matrix representated through arrays inside of arrays
 */
export default class Matrix {
  constructor(matrixRepresentation) {
    this.__arrayMatrix__ = matrixRepresentation
    this.__stringMatrix__ = getMatrixString(matrixRepresentation)
  }

  toString() {
    return this.__stringMatrix__
  }

  toArray() {
    return this.__arrayMatrix__
  }

  scaleTo(x, y, z) {
    const scaleMatrix = getScaleMatrix(x, y, z)
    const calculatedMatrix = multiply(this.toArray(), scaleMatrix)

    this.__arrayMatrix__ = calculatedMatrix
    this.__stringMatrix__ = getMatrixString(calculatedMatrix)

    return this
  }

  translateTo(x, y, z) {
    const translateMatrix = getTranslateMatrix(x, y, z)
    const calculatedMatrix = multiply(this.toArray(), translateMatrix)

    this.__arrayMatrix__ = calculatedMatrix
    this.__stringMatrix__ = getMatrixString(calculatedMatrix)

    return this
  }

  rotateTo(alpha) {
    const rotateMatrix = getRotateMatrix(alpha)
    const calculatedMatrix = multiply(this.toArray(), rotateMatrix)

    this.__arrayMatrix__ = calculatedMatrix
    this.__stringMatrix__ = getMatrixString(calculatedMatrix)

    return this
  }

  skewTo(alpha, beta) {
    const skewMatrix = getSkewMatrix(alpha, beta)
    const calculatedMatrix = multiply(this.toArray(), skewMatrix)

    this.__arrayMatrix__ = calculatedMatrix
    this.__stringMatrix__ = getMatrixString(calculatedMatrix)

    return this
  }
}

import multiply from './multiply'
import normalizeMatrix from './normalize-matrix'
import calculateVectorLength from './vector-length'

function getMatrixString(mtrx) {
  // transpose matrix (mtrx) and trim spaces manually to
  // avoid extra memory allocations
  const firstRow = `${mtrx[0][0]},${mtrx[1][0]},${mtrx[2][0]},${mtrx[3][0]}`
  const secondRow = `${mtrx[0][1]},${mtrx[1][1]},${mtrx[2][1]},${mtrx[3][1]}`
  const thirdRow = `${mtrx[0][2]},${mtrx[1][2]},${mtrx[2][2]},${mtrx[3][2]}`
  const fourthRow = `${mtrx[0][3]},${mtrx[1][3]},${mtrx[2][3]},${mtrx[3][3]}`

  return `matrix3d(${firstRow},${secondRow},${thirdRow},${fourthRow})`
}

function getScaleMatrix(x, y, z) {
  return [[x, 0, 0, 0], [0, y, 0, 0], [0, 0, z, 0], [0, 0, 0, 1]]
}

function getTranslateMatrix(x, y, z) {
  return [[1, 0, 0, x], [0, 1, 0, y], [0, 0, 1, z], [0, 0, 0, 1]]
}

function getSkewMatrix(alpha, beta) {
  const alphaInRadians = Math.PI * alpha / 180
  const betaInRadians = Math.PI * beta / 180
  // fixing decimals to six, as most browsers do
  const alphaTan = +Math.tan(alphaInRadians).toFixed(6)
  const betaTan = +Math.tan(betaInRadians).toFixed(6)

  return [[1, alphaTan, 0, 0], [betaTan, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]
}

function getRotateMatrix(alpha) {
  const angleInRadians = Math.PI * alpha / 180
  // fixing decimals to six, as most browsers do
  const cos = +Math.cos(angleInRadians).toFixed(6)
  const sin = +Math.sin(angleInRadians).toFixed(6)

  return [[cos, -sin, 0, 0], [sin, cos, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]
}

/**
 * Builds a matrix for later transform manipulation
 * @constructor matrix
 * @param {Array} matrixRepresentation - matrix representated through arrays inside of arrays
 */
export default class Matrix {
  constructor(matrixRepresentation) {
    this.__a = matrixRepresentation
    this.__s = getMatrixString(matrixRepresentation)
  }

  /**
   * Returns the matrix as a 3d transform string for DOM elements.
   * @method toString
   * @returns {string} matrix as matrix3d trasnform string
   */
  toString() {
    return this.__s
  }

  /**
   * Returns a representation of the matrix object using arrays.
   * @method toArray
   * @returns {Array} array of arrays of the current status of the matrix
   */
  toArray() {
    return this.__a
  }

  /**
   * Applies a scale transform to matrix object
   * @method scaleTo
   * @params x - scaling over the x axis
   * @params y - scaling over the y axis
   * @params z - scaling over the z axis
   * @memberof Matrix
   */
  scaleTo(x = 1, y = 1, z = 1) {
    const scaleMatrix = getScaleMatrix(x, y, z)
    const calculatedMatrix = multiply(this.toArray(), scaleMatrix)

    this.__a = calculatedMatrix
    this.__s = getMatrixString(calculatedMatrix)

    return this
  }

  /**
   * Applies a translation transform to the matrix object
   * @method translateTo
   * @params x - translation over the x axis
   * @params y - translation over the y axis
   * @params z - translation over the z axis
   * @memberof Matrix
   */
  translateTo(x = 0, y = 0, z = 0) {
    const translateMatrix = getTranslateMatrix(x, y, z)
    const calculatedMatrix = multiply(this.toArray(), translateMatrix)

    /*
     * private fields minified to have less impact on bundle size
     * __a hoists the array representation of the matrix
     * __s hoists the string representation of the matrix
     */
    this.__a = calculatedMatrix
    this.__s = getMatrixString(calculatedMatrix)

    return this
  }

  /**
   * Applies a rotation transform to the matrix object
   * @method rotateTo
   * @params alpha - rotation over the z axis
   * @memberof Matrix
   */
  rotateTo(alpha = 0) {
    const rotateMatrix = getRotateMatrix(alpha)
    const calculatedMatrix = multiply(this.toArray(), rotateMatrix)

    this.__a = calculatedMatrix
    this.__s = getMatrixString(calculatedMatrix)

    return this
  }

  /**
   * Applies a skewing transform to the matrix object
   * @method skewTo
   * @params alpha - skewing over the x axis
   * @params beta - skewing over the y axis
   * @memberof Matrix
   */
  skewTo(alpha = 0, beta = 0) {
    const skewMatrix = getSkewMatrix(alpha, beta)
    const calculatedMatrix = multiply(this.toArray(), skewMatrix)

    this.__a = calculatedMatrix
    this.__s = getMatrixString(calculatedMatrix)

    return this
  }

  decompose() {
    const translate = [this.__a[0][3], this.__a[1][3], this.__a[2][3],]
    const normalized = normalizeMatrix(this.__a)

    const reducedMatrix = [
      [ this.__a[0][0], this.__a[1][0], this.__a[2][0] ],
      [ this.__a[0][1], this.__a[1][1], this.__a[2][1] ],
      [ this.__a[0][2], this.__a[1][2], this.__a[2][2] ],
    ]

    const scale = reducedMatrix.map(row => calculateVectorLength(row))

    return {
      translate,
      scale
    }
  }
}

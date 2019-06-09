import Matrix from './matrix'
import { identity } from './constants'

// regexp to detect transform matrices
const matrixRegEx = /^(matrix(3d)?\()/g

// regexp to strip matrix notation
const matrixCleanRegEx = /^(matrix(3d)?\()|\)/g

// regexp to split values
const stripRegEx = /,\s|,/g

/**
 * Returns a matrix object representation of an element's transformation
 * @method getMatrixFromElement
 * @params {Node} el - element to extract transformations from
 * @returns {Matrix}
 */
const getMatrixFromElement = (el) => {
  const transformMatrix = getComputedStyle(el).transform

  // handle 2d matrix
  if (matrixRegEx.test(transformMatrix)) {
    const parsedMatrix = transformMatrix
      .replace(matrixCleanRegEx, '')
      .split(stripRegEx)
      .map((n) => parseFloat(n))

    const matrix = [
      [parsedMatrix[0], parsedMatrix[2], 0, 0],
      [parsedMatrix[1], parsedMatrix[3], 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1]
    ]

    return new Matrix(matrix)
  }

  // handle 3d matrix
  if (matrixRegEx.test(transformMatrix)) {
    const parsedMatrix = transformMatrix
      .replace(matrixCleanRegEx, '')
      .split(stripRegEx)
      .map((n) => parseFloat(n))

    const matrix = [
      [parsedMatrix[0], parsedMatrix[4], parsedMatrix[8], parsedMatrix[12]],
      [parsedMatrix[1], parsedMatrix[5], parsedMatrix[9], parsedMatrix[13]],
      [parsedMatrix[2], parsedMatrix[6], parsedMatrix[10], parsedMatrix[14]],
      [parsedMatrix[3], parsedMatrix[7], parsedMatrix[11], parsedMatrix[15]]
    ]

    return new Matrix(matrix)
  }

  // default to identity matrix
  return new Matrix(identity)
}

export default getMatrixFromElement

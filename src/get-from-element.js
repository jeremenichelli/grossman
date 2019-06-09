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
 * @params {node} el - element to extract transformations from
 * @returns {Matrix}
 */
const getMatrixFromElement = (el) => {
  const transformMatrix = getComputedStyle(el).transform

  // handle 2d matrix
  if (matrixRegEx.test(transformMatrix)) {
    const stringMatrix = transformMatrix
      .replace(matrixCleanRegEx, '')
      .split(stripRegEx)
    const numberedMatrix = stringMatrix.map((n) => parseFloat(n))

    const matrix = [
      [numberedMatrix[0], numberedMatrix[2], 0, 0],
      [numberedMatrix[1], numberedMatrix[3], 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1]
    ]

    return new Matrix(matrix)
  }

  // handle 3d matrix
  if (matrixRegEx.test(transformMatrix)) {
    const stringMatrix = transformMatrix
      .replace(matrixCleanRegEx, '')
      .split(stripRegEx)
    const numberedMatrix = stringMatrix.map((n) => parseFloat(n))

    const matrix = [
      [
        numberedMatrix[0],
        numberedMatrix[4],
        numberedMatrix[8],
        numberedMatrix[12]
      ],
      [
        numberedMatrix[1],
        numberedMatrix[5],
        numberedMatrix[9],
        numberedMatrix[13]
      ],
      [
        numberedMatrix[2],
        numberedMatrix[6],
        numberedMatrix[10],
        numberedMatrix[14]
      ],
      [
        numberedMatrix[3],
        numberedMatrix[7],
        numberedMatrix[11],
        numberedMatrix[15]
      ]
    ]

    return new Matrix(matrix)
  }

  // default to identity matrix
  return new Matrix(identity)
}

export default getMatrixFromElement

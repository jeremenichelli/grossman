import determinant from './determinant'

function normalizeMatrix(matrix) {
  const d = determinant(matrix)
  const normalized = matrix.map(row => row.map(n => n / d))

  return normalized
}

export default normalizeMatrix

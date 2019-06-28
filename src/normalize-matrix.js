function normalizeMatrix(matrix) {
  const delta = 1 / matrix[3][3]
  const normalized = matrix.map(row => row.map(value => value / delta))

  return normalized
}

export default normalizeMatrix

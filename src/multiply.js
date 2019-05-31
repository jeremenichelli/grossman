/**
 * Multiplies two matrices and returns the result
 * @function multiply
 * @param {Array} f matrix, representated through arrays inside an array
 * @param {Array} g matrix, representated through arrays inside an array
 * @returns {Array} resulting matrix
 */
function multiply(f, g) {
  return f.map((row) => resolveRow(row, g))
}

/**
 * Given a row from first matrix, a second matrix and a column index,
 * returns the resulting number from a matrix multiplication
 * @function resolveValue
 * @param {Array} row row from a matrix representation
 * @param {Array} matrix matrix, representated through arrays inside an array
 * @returns {number}
 */
function resolveValue(row, matrix, columnPosition) {
  return row.reduce(
    (acc, rowValue, rowPosition) =>
      acc + rowValue * matrix[rowPosition][columnPosition],
    0
  )
}

/**
 * Given a row from first matrix and a second matrix returns a new array
 * representing the resulting row from a matrix multiplication
 * @function resolveRow
 * @param {Array} row row coming from a matrix representation
 * @param {Array} matrix matrix, representated through arrays inside an array
 * @returns {Array}
 */
function resolveRow(row, g) {
  // take resulting row length from first row length in (g) matrix
  const calculatedRow = new Array(g[0].length)

  for (let i = 0; i < g[0].length; i++) {
    calculatedRow[i] = resolveValue(row, g, i)
  }

  return calculatedRow
}

export default multiply

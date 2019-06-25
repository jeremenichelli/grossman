function determinant(matrix) {
  const a = matrix[0][0]
  const b = matrix[0][1]
  const c = matrix[0][2]
  const d = matrix[0][3]
  const e = matrix[1][0]
  const f = matrix[1][1]
  const g = matrix[1][2]
  const h = matrix[1][3]
  const i = matrix[2][0]
  const j = matrix[2][1]
  const k = matrix[2][2]
  const l = matrix[2][3]
  const m = matrix[3][0]
  const n = matrix[3][1]
  const o = matrix[3][2]
  const p = matrix[3][3]

  return (
    +a * (f*k*p - f*l*o - g*j*p + g*l*n + h*j*o - h*k*n)
    - b * (e*k*p - e*l*o - g*i*p + g*l*m + h*i*o - h*k*m)
    + c * (e*j*p - e*l*n - f*i*p + f*l*m + h*i*n - h*j*m)
    - d * (e*j*o - e*k*n - f*i*o + f*k*m + g*i*n - g*j*m)
  )
}

export default determinant

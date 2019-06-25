function calculateVectorLength(vector) {
  return Math.sqrt(vector.reduce((acc, value) => acc += value * value, 0))
}

export default calculateVectorLength

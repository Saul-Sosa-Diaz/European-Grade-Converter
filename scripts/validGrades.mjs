

export function generateGrades(startParam, endParam, stepParam) {
  const result = []
  let step = parseFloat(stepParam)
  if ( step === 0 ) {
    step = 1
  }
  const start = startParam < endParam ? parseFloat(startParam) : parseFloat(endParam)
  const end = startParam < endParam ? parseFloat(endParam) : parseFloat(startParam)
  for (let i = start; i <= end; i += step) {
    i = parseFloat(i.toFixed(2))
    result.push(String(i))
  }
  return result
}
// import fs from 'fs'
// const grades = generateGrades(0, 20, 0.01)

// // Format the results as a JSON with a specific format
// const formattedGrades = `{"${grades.join('","')}"}`

// // Save the results to a file
// fs.writeFileSync('grades.txt', formattedGrades, 'utf-8')

// console.log('Grades have been written to grades.txt')

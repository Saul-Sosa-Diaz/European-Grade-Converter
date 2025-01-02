

export function generateGrades(start, end, step) {
  const result = []
  for (let i = start; i <= end; i += step) {
    // Round the number to two decimals
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

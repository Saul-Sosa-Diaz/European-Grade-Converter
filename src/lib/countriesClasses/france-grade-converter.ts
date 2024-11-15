import { ICountryConverter } from '@/lib/interfaces/i-grade-converter'

export class FranceGradeConverter implements ICountryConverter {
  convertToDestinationCountry(grade: number): string {
    return (grade * 2).toString()
  }
  convertToSpain(grade: string): string {
    const NewGrade = parseFloat(grade)
    return (NewGrade / 2).toString()
  }
}

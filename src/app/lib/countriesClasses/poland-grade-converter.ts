import { ICountryConverter } from "@/src/app/lib/interfaces/i-grade-converter";

export class PolandGradeConverter implements ICountryConverter {
  convertToDestinationCountry(grade: number): string {
    if (grade >= 9) return "5";
    if (grade >= 8) return "4.5";
    if (grade >= 7) return "4";
    if (grade >= 6) return "3.5";
    if (grade >= 5) return "3";
    return "Fail";
  }

  convertToSpain(grade: string): string {
    const NewGrade = parseFloat(grade);
    if (NewGrade === 5) return "9.5";
    if (NewGrade === 4.5) return "8.5";
    if (NewGrade === 4) return "7.5";
    if (NewGrade === 3.5) return "6.5";
    if (NewGrade === 3) return "5.5";
    return "2.5";
  }
}

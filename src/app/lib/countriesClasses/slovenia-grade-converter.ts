import { ICountryConverter } from "@/src/app/lib/interfaces/i-grade-converter";

export class SloveniaGradeConverter implements ICountryConverter {
  convertToDestinationCountry(grade: number): string {
    if (grade >= 9) return "10 (excellent)";
    if (grade >= 8) return "9 (very good)";
    if (grade >= 7) return "8 (good)";
    if (grade >= 6) return "7 (satisfactory)";
    if (grade >= 5) return "6 (sufficient)";
    return "Fail";
  }

  convertToSpain(grade: string): string {
    const NewGrade = parseFloat(grade);
    if (NewGrade === 10) return "9.5";
    if (NewGrade === 9) return "8.5";
    if (NewGrade === 8) return "7.5";
    if (NewGrade === 7) return "6.5";
    if (NewGrade === 6) return "5.5";
    return "2.5";
  }
}

import { ICountryConverter } from "@/src/app/lib/interfaces/i-grade-converter";

export class AustriaGradeConverter implements ICountryConverter {
  convertToDestinationCountry(grade: number): string {
    if (grade >= 9) return "1 (Sehr gut)";
    if (grade >= 7) return "2 (Sehr gut)";
    if (grade >= 6) return "3 (Gut)";
    if (grade >= 5) return "4 (Befriedigend)";
    return "0 (Fail)";
  }

  convertToSpain(grade: string): string {
    const NewGrade = parseFloat(grade);
    if (NewGrade === 1) return "9";
    if (NewGrade === 2) return "8";
    if (NewGrade === 3) return "6.5";
    if (NewGrade === 4) return "5.5";
    return "0";
  }
}

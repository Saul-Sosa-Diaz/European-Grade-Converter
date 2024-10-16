import { ICountryConverter } from "@/src/app/lib/interfaces/i-grade-converter";

export class AustriaGradeConverter implements ICountryConverter {
  convertToDestinationCountry(grade: number): string {
    if (grade >= 9) return "1 (Sehr gut)";
    if (grade >= 8) return "2 (Gut)";
    if (grade >= 7) return "3 (Befriedigend)";
    if (grade >= 5) return "4 (Genügend)";
    return "5 (Nicht genügend)";
  }

  convertToSpain(grade: string): string {
    const NewGrade = parseFloat(grade);
    if (NewGrade === 1) return "9.5";
    if (NewGrade === 2) return "8.5";
    if (NewGrade === 3) return "7.5";
    if (NewGrade === 4) return "6.5";
    if (NewGrade === 5) return "0";
  }
}

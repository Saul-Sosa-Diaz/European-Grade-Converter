import { ICountryConverter } from "@/src/app/lib/interfaces/i-grade-converter";

export class AustriaGradeConverter implements ICountryConverter {
  convertToDestinationCountry(grade: number): string {
    if (grade >= 9) return "1 (Sehr gut)";
    if (grade >= 7) return "2 (Sehr gut)";
    if (grade >= 6) return "3 (Gut)";
    if (grade >= 5) return "4 (Befriedigend)";
    return "Fail";
  }

  convertToSpain(grade: number): string {
    if (grade === 1) return "9";
    if (grade === 2) return "8";
    if (grade === 3) return "6.5";
    if (grade === 4) return "5.5";
    return "0";
  }
}

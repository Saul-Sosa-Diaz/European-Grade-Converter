import { ICountryConverter } from "@/src/app/lib/interfaces/i-grade-converter";

export class NorwayGradeConverter implements ICountryConverter {
  convertToDestinationCountry(grade: number): string {
    if (grade >= 9) return "A (Excellent)";
    if (grade >= 8) return "B (Very good)";
    if (grade >= 7) return "C (Good)";
    if (grade >= 6) return "D (Satisfactory)";
    if (grade >= 5) return "E (Sufficient)";
    return "F (Fail)";
  }

  convertToSpain(grade: string): string {
    
    if (grade === "A") return "9.5";
    if (grade === "B") return "8.5";
    if (grade === "C") return "7.5";
    if (grade === "D") return "6.5";
    if (grade === "E") return "5.5";
    if (grade === "F") return "3.5";
  }
}

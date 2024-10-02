import { ICountryConverter } from "@/src/app/lib/interfaces/i-grade-converter";

export class NorwayGradeConverter implements ICountryConverter {
  convertToDestinationCountry(grade: number): string {
    if (grade >= 9) return "6";
    if (grade >= 8) return "5";
    if (grade >= 7) return "4";
    if (grade >= 6) return "3";
    if (grade >= 5) return "2";
    return "Fail";
  }

  convertToSpain(grade: number): string {
    if (grade === 6) return "9.5";
    if (grade === 5) return "8.5";
    if (grade === 4) return "7.5";
    if (grade === 3) return "6.5";
    if (grade === 2) return "5.5";
    return "0";
  }
}

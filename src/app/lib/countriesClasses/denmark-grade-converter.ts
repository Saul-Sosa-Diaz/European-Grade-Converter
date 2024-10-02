import { ICountryConverter } from "@/src/app/lib/interfaces/i-grade-converter";

export class DenmarkGradeConverter implements ICountryConverter {
  convertToDestinationCountry(grade: number): string {
    if (grade >= 9) return "12";
    if (grade >= 8) return "10";
    if (grade >= 7) return "7";
    if (grade >= 6) return "4";
    if (grade >= 5) return "2";
    return "Fail";
  }

  convertToSpain(grade: number): string {
    if (grade >= 12) return "9.5";
    if (grade >= 10) return "8.5";
    if (grade >= 7) return "7.5";
    if (grade >= 4) return "6.5";
    if (grade >= 2) return "5.5";
    return "2.5";
  }
}

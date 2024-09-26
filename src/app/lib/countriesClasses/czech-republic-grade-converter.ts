import { ICountryConverter } from "@/src/app/lib/interfaces/i-grade-converter";

export class BulgariaGradeConverter implements ICountryConverter {
  convertToDestinationCountry(grade: number): string {
    if (grade >= 9) return "6 (Otlichen)";
    if (grade >= 8) return "5 (Mnogo Dobur)";
    if (grade >= 7) return "4 (Dobur)";
    if (grade >= 5) return "3 (Sreden)";
    return "0";
  }

  convertToSpain(grade: number): string {
    if (grade === 6) return "9.5";
    if (grade === 5) return "8.5";
    if (grade === 4) return "7.5";
    if (grade === 3) return "6";
    return "0";
  }
}

import { ICountryConverter } from "@/src/lib/interfaces/i-grade-converter";

export class BulgariaGradeConverter implements ICountryConverter {
  convertToDestinationCountry(grade: number): string {
    if (grade >= 9) return "6 (Otlichen)";
    if (grade >= 8) return "5 (Mnogo Dobur)";
    if (grade >= 7) return "4 (Dobur)";
    if (grade >= 5) return "3 (Sreden)";
    return "Fail";
  }

  convertToSpain(grade: string): string {
    const NewGrade = parseFloat(grade);
    if (NewGrade === 6) return "9.5";
    if (NewGrade === 5) return "8.5";
    if (NewGrade === 4) return "7.5";
    if (NewGrade === 3) return "6";
    return "2.5";
  }
}

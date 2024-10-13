import { ICountryConverter } from "@/src/app/lib/interfaces/i-grade-converter";

export class SloveniaGradeConverter implements ICountryConverter {
  convertToDestinationCountry(grade: number): string {
    if (grade >= 9) return "5 (Odlicno)";
    if (grade >= 8) return "4 (Prav Dobro)";
    if (grade >= 7) return "3 (Dobro)";
    if (grade >= 5) return "2 (Zadostno / Zadovoljava)";
    return "Fail";
  }

  convertToSpain(grade: string): string {
    const NewGrade = parseFloat(grade);
    if (NewGrade === 5) return "9.5";
    if (NewGrade === 4) return "8.5";
    if (NewGrade === 3) return "7.5";
    if (NewGrade === 2) return "6.0";
    return "2.5";
  }
}

import { ICountryConverter } from "@/src/app/lib/interfaces/i-grade-converter";

export class SpainGradeConverter implements ICountryConverter {
  convertToDestinationCountry(grade: number): string {
    if (grade < 5.0) {
      let result = "Suspenso";
      if (grade > 0) {
        result += " (" + grade.toString() + ")";
      }
      return result;
    }
    return grade.toString();
  }
  convertToSpain(grade: string): string {
    return grade.toString();
  }
}

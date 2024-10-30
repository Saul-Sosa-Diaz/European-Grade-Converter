import { ICountryConverter } from "@/src/lib/interfaces/i-grade-converter";

export class SpainGradeConverter implements ICountryConverter {
  convertToDestinationCountry(grade: number): string {
    if (grade < 5.0) {
      return grade.toString() + " (Suspenso)";
    }
    if (grade < 7.0) {
      return grade.toString() + " (Aprobado)";
    }
    if (grade < 9.0) {
      return grade.toString() + " (Notable)";
    }

    return grade.toString() + " (Sobresaliente)";
  }
  convertToSpain(grade: string): string {
    return grade.toString();
  }
}

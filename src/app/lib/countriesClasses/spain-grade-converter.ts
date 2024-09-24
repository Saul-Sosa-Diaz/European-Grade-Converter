import { ICountryConverter } from "@/src/app/lib/interfaces/i-grade-converter";

export class SpainGradeConverter implements ICountryConverter {
  convertToDestinationCountry(grade: number): string {
    return grade.toString();
  }
  convertToSpain(grade: number): string {
    return grade.toString();
  }
}

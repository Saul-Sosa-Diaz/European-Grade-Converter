import { ICountryConverter } from "@/src/app/lib/interfaces/i-grade-converter";

export class SpainGradeConverter implements ICountryConverter {
  convertTo(grade: number): string {
    return grade.toString();
  }
  convertFrom(grade: number): string {
    return grade.toString();
  }
}

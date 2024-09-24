import { ICountryConverter } from "@/src/app/lib/interfaces/i-grade-converter";

export class IrelandGradeConverter implements ICountryConverter {
  convertTo(grade: number): string {
    return (grade * 2).toString();
  }
  convertFrom(grade: number): string {
    return (grade / 2).toString();
  }
}

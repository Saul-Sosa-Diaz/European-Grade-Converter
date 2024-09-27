import { ICountryConverter } from "@/src/app/lib/interfaces/i-grade-converter";

export class PortugalGradeConverter implements ICountryConverter {
  convertToDestinationCountry(grade: number): string {
    return (grade * 2).toString();
  }
  convertToSpain(grade: number): string {
    return (grade / 2).toString();
  }
}

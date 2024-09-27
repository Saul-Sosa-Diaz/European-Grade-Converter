import { ICountryConverter } from "@/src/app/lib/interfaces/i-grade-converter";
type GradeRange = {
  min: number;
  max: number;
  base: number;
  name: string;
};
export class IrelandGradeConverter implements ICountryConverter {
  private gradeRanges: GradeRange[] = [
    { min: 40, max: 44, base: 5, name: "Compensating Fail" },
    { min: 45, max: 49, base: 6, name: "Third Class Honours" },
    { min: 50, max: 59, base: 7, name: "Lower Second Class Honours" },
    { min: 60, max: 69, base: 8, name: "Upper Second Class Honours" },
    { min: 70, max: 99, base: 9, name: "First Class Honours" },
  ];
  convertToDestinationCountry(grade: number): string {
    const RANGE = this.gradeRanges.find((r) => grade >= r.base && ((grade <= r.base + 1)));
    if (!RANGE) return "Fail (0%-39%)";
    const RESULT =
      (RANGE.min + (grade - RANGE.base) * (RANGE.max + 1 - RANGE.min)).toFixed(2);
    return ` ${RESULT}% (${RANGE.name})`;
  }
  convertToSpain(grade: number): string {
    if (grade === this.gradeRanges[this.gradeRanges.length - 1].max + 1) return "10"; // if the grade is 100, return 10
    const RANGE = this.gradeRanges.find(
      (r) => grade >= r.min && grade <= r.max
    ); // Find the range of the grade
    if (!RANGE) return "0"; // if the range is not found, return 0
    const result =
      RANGE.base + (grade - RANGE.min) / (RANGE.max + 1 - RANGE.min);
    return result.toFixed(2);
    // new comment
  }
}

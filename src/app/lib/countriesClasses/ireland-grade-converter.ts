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
    { min: 70, max: 100, base: 9, name: "First Class Honours" },
  ];
  convertToDestinationCountry(grade: number): string {
    const range = this.gradeRanges.find(
      (r) => grade >= r.base && grade < r.base + 1
    );
    if (!range) return "Fail (0%-39%)";
    return ` ${range.name} (${range.min}%-${range.max}%)`;
  }
  convertToSpain(grade: number): string {
    const range = this.gradeRanges.find(
      (r) => grade >= r.min && grade <= r.max
    ); // Find the range of the grade
    if (!range) return "0"; // if the range is not found, return 0
    const result = range.base + (grade - range.min) / (range.max  - range.min); // 6 + (49 - 45) / (49 - 45) // 7 + (50 - 50) / (59 - 50)
    return result.toFixed(2);
  }
}

import { ICountryConverter } from "@/src/app/lib/interfaces/i-grade-converter";
type GradeRange = {
  min: number;
  max: number;
  base: number;
};
export class IrelandGradeConverter implements ICountryConverter {
  private gradeRanges: GradeRange[] = [
    { min: 40, max: 44, base: 5 }, // Entre 40-45, base 5
    { min: 45, max: 49, base: 6 }, // Entre 45-50, base 6
    { min: 50, max: 59, base: 7 }, // Entre 50-60, base 7
    { min: 60, max: 69, base: 8 }, // Entre 60-70, base 8
    { min: 70, max: 100, base: 9}, // Entre 70-100, base 9
  ];
  convertToDestinationCountry(grade: number): string {
    const range = this.gradeRanges.find((r) => grade >= r.base && grade <= r.base + 1);
    if (!range) return "0%-39%";
    return`${range.min}%-${range.max}%`;

  }
  convertToSpain(grade: number): string {
    const range = this.gradeRanges.find((r) => grade >= r.min && grade <= r.max); // Find the range of the grade
    if (!range) return "0"; // if the range is not found, return 0
    const result = range.base + (grade - range.min) / (range.max - range.min);
    return result.toFixed(2);
  }
}

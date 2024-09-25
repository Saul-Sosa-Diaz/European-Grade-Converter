import { ICountryConverter } from "@/src/app/lib/interfaces/i-grade-converter";
type GradeRange = {
  min: number;
  max: number;
  base: number;
};
export class UnitedKingdomGradeConverter implements ICountryConverter {
  private gradeRanges: GradeRange[] = [
    { min: 40, max: 49, base: 5 },
    { min: 50, max: 54, base: 6 },
    { min: 55, max: 59, base: 7 },
    { min: 60, max: 69, base: 8 },
    { min: 70, max: 100, base: 9},
  ];
  convertToDestinationCountry(grade: number): string {
    console.log(grade);
    const range = this.gradeRanges.find((r) => grade >= r.base && grade < r.base + 0.99);
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

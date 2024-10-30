import { ICountryConverter } from "@/src/lib/interfaces/i-grade-converter";
interface GradeRange {
  min: number;
  max: number;
  base: number; // Nota base en el sistema español
  factor?: number; // Factor para ajustar dentro del rango
  top: number; // Nota máxima en el sistema español
}

export class ItalyBoloniaEngineeringGradeConverter
  implements ICountryConverter
{
  private gradeRanges: GradeRange[] = [
    //{ min: 30, max: 30, base: 9.5, factor: 0.5 }, // 30 a 9.5, y si es cum laude llega a 10
    { min: 29, max: 30, base: 8, top: 9, factor: 1 / 2 },
    { min: 26, max: 28, base: 7, top: 7.99, factor: 0.99 / 3 },
    { min: 20, max: 25, base: 6, top: 6.99, factor: 0.99 / 6 },
    { min: 18, max: 19, base: 5, top: 5.99, factor: 0.99 / 2 },
    { min: 0, max: 17, base: 0, top: 4.99, factor: 4.99 / 18 }, // De 0 a 5 (5 puntos distribuidos en 18 unidades)
  ];
  convertToDestinationCountry(grade): string {
    if (grade > 9) return "30 Cum Laude";
    for (const range of this.gradeRanges) {
      if (grade >= range.base && grade <= range.top) {
        return (range.min + (grade - range.base) / range.factor).toFixed(0);
      }
    }

    return "Fail";
  }
  convertToSpain(grade: number | string): string {
    if (typeof grade === "string" && grade === "30L") return "10";
    grade = typeof grade === "string" ? parseFloat(grade) : grade;
    for (const range of this.gradeRanges) {
      if (grade >= range.min && grade <= range.max) {
        return (range.base + (grade - range.min) * range.factor).toFixed(2);
      }
    }
    return "0";
  }
}

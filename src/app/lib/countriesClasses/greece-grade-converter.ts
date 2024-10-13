import { ICountryConverter } from "@/src/app/lib/interfaces/i-grade-converter";

interface GradeRange {
  min: number;
  max: number;
  base: number; // Nota base en el sistema español o italiano
  name?: string; // Descripción opcional del rango
  top: number; // Nota máxima del rango
  factor: number; // Factor para ajustar dentro del rango
}

export class GreeceGradeConverter implements ICountryConverter {
  private gradeRanges: GradeRange[] = [
    { min: 8.5, max: 10, base: 9, top: 10, name: "Excellent", factor: 1.5 }, // 9.0 - 10.0 1 punto a repartir en 1.5
    {
      min: 6.5,
      max: 8.49,
      base: 7,
      top: 8.99,
      name: "Very Good",
      factor: 1,
    }, // 7 - 8.9 2 puntos a repartir en 2 puntos
    { min: 5.0, max: 6.49, base: 5, top: 6.99, name: "Good", factor: 1.33 }, // 5.0 - 6.99 2 puntos a repartir en 1.5 punto
    { min: 0.1, max: 4.9, base: 0.1, top: 4.99, name: "Fail", factor: 1 }, // 0 - 4.99
  ];

  convertToDestinationCountry(grade: number): string {
    for (const range of this.gradeRanges) {
      if (grade >= range.base && grade <= range.top) {
        return (
          (range.min + (grade - range.base) * range.factor).toFixed(2) +
          "(" +
          range.name +
          ")"
        );
      }
    }
    return "0";
  }

  convertToSpain(grade: string): string {
    const NewGrade = parseFloat(grade);
    for (const range of this.gradeRanges) {
      if (NewGrade >= range.min && NewGrade <= range.max) {
        return (range.base + (NewGrade - range.min) / range.factor).toFixed(2);
      }
    }
    return "0";
  }
}

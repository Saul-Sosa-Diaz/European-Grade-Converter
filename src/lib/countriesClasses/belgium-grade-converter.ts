import { ICountryConverter } from "@/src/lib/interfaces/i-grade-converter";

interface GradeRange {
  min: number;
  max: number;
  base: number; // Nota base en el sistema español o italiano
  name?: string; // Descripción opcional del rango
  top: number; // Nota máxima del rango
  factor: number; // Factor para ajustar dentro del rango
}
export class BelgiumGradeConverter implements ICountryConverter {
  private gradeRanges: GradeRange[] = [
    { min: 18, max: 20, base: 9, top: 10, name: "Excellent", factor: 2 }, // 18 - 20 2 puntos a repartir en 1 consodero que acaba justo en 10 y no en 10.99
    {
      min: 15,
      max: 17,
      base: 8,
      top: 8.99,
      name: "Very good",
      factor: 3 / 0.99,
    },
    { min: 13, max: 14, base: 7, top: 7.99, name: "Good", factor: 2 / 0.99 }, // 2 puntos a repartir en 0.99 punto considero que acaba en 7.99 y no en 7, por eso le pongo 2 puntos
    {
      min: 11,
      max: 12,
      base: 6,
      top: 6.99,
      name: "Satisfactory",
      factor: 3 / 0.99,
    },
    {
      min: 10,
      max: 10,
      base: 5,
      top: 5.99,
      name: "Sufficient",
      factor: 1,
    },
    {
      min: 8,
      max: 9,
      base: 4.5,
      top: 4.5,
      name: "Fx Fail",
      factor: 1 / 0.001,
    },
    { min: 0.1, max: 7, base: 0.1, top: 4.5, name: "Fail", factor: 8 / 4.5 }, // 0 - 7
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
        // 9 + (20 - 18) / 3
      }
    }
    return "0";
  }
}

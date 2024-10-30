import { ICountryConverter } from "@/src/lib/interfaces/i-grade-converter";
interface GradeRange {
  min: number;
  max: number;
  base: number; // Nota base en el sistema español o italiano
  name?: string; // Descripción opcional del rango
  top: number; // Nota máxima del rango
  factor: number; // Factor para ajustar dentro del rango
}
export class PortugalGradeConverter implements ICountryConverter {
  private gradeRanges: GradeRange[] = [
    { min: 18, max: 20, base: 9, top: 10, name: "Excellent", factor: 2 },
    {
      min: 16,
      max: 17,
      base: 8,
      top: 8.99,
      name: "Very good",
      factor: 2 / 0.99,
    },
    { min: 14, max: 15, base: 7, top: 7.99, name: "Good", factor: 2 / 0.99 }, // 2 puntos a repartir en 0.99 punto considero que acaba en 7.99 y no en 7, por eso le pongo 2 puntos
    {
      min: 12,
      max: 13,
      base: 6,
      top: 6.99,
      name: "Satisfactory",
      factor: 2 / 0.99,
    },
    {
      min: 10,
      max: 11,
      base: 5,
      top: 5.99,
      name: "Sufficient",
      factor: 2,
    },
    { min: 0, max: 9, base: 0.1, top: 4.9, name: "Fail", factor: 10 / 4.9 },
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

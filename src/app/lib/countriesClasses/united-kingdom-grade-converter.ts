import { ICountryConverter } from "@/src/app/lib/interfaces/i-grade-converter";
interface GradeRange {
  min: number;
  max: number;
  base: number; // Nota base en el sistema español o italiano
  factor?: number; // Factor para ajustar dentro del rango
  name?: string; // Descripción opcional del rango
  top: number; // Nota máxima del rango
}
export class UnitedKingdomGradeConverter implements ICountryConverter {
  private gradeRanges: GradeRange[] = [
    {
      min: 70,
      max: 100,
      base: 9,
      top: 10,
      name: "First-Class Degree",
      factor: 30,
    },
    {
      min: 60,
      max: 69,
      base: 8,
      top: 8.99,
      name: "Upper Second-Class Degree",
      factor: 10,
    },
    {
      min: 50,
      max: 59,
      base: 7,
      top: 7.99,
      name: "Lower Second-Class Degree",
      factor: 10,
    }, // 2 puntos a repartir en 0.99 punto considero que acaba en 7.99 y no en 7, por eso le pongo 2 puntos
    {
      min: 40,
      max: 49,
      base: 6,
      top: 6.99,
      name: "Third Class Degree",
      factor: 10,
    },
    { min: 0, max: 39, base: 0.1, top: 4.9, name: "Fail", factor: 40 / 4.9 },
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

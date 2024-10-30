import { ICountryConverter } from "@/src/lib/interfaces/i-grade-converter";

interface GradeRange {
  min: number;
  max: number;
  base: number; // Nota base en el sistema español o italiano
  name?: string; // Descripción opcional del rango
  top: number; // Nota máxima del rango
  factor: number; // Factor para ajustar dentro del rango
}
export class SwitzerlandGradeConverter implements ICountryConverter {
  private gradeRanges: GradeRange[] = [
    {
      min: 5.75,
      max: 6,
      base: 9,
      top: 10,
      name: "(ausgezeichnet)",
      factor: 0.25,
    }, // 5.75 - 6 0.25 puntos a repartir en 0.25 consodero que acaba justo en 10 y no en 10.99
    {
      min: 5.25,
      max: 5.5,
      base: 8,
      top: 8.99,
      name: "(sehr gut)",
      factor: 0.27,
    },
    { min: 4.75, max: 5, base: 7, top: 7.99, name: "(gut)", factor: 0.27 }, // 2 puntos a repartir en 0.99 punto considero que acaba en 7.99 y no en 7, por eso le pongo 2 puntos
    {
      min: 4.25,
      max: 4.5,
      base: 6,
      top: 6.99,
      name: "(befriedigend)",
      factor: 0.27,
    },
    {
      min: 4,
      max: 4,
      base: 5,
      top: 5,
      name: "(genügend)",
      factor: 1,
    },
    {
      min: 3.5,
      max: 3.5,
      base: 4,
      top: 4,
      name: "(ungenügend)",
      factor: 1,
    },
    {
      min: 3,
      max: 3,
      base: 3,
      top: 3,
      name: "(schlecht)",
      factor: 1,
    },
    {
      min: 2.5,
      max: 2.5,
      base: 2,
      top: 2,
      name: "(schlecht bis sehr schlecht)",
      factor: 1,
    },
    {
      min: 2,
      max: 2,
      base: 1,
      top: 1,
      name: "(sehr schlecht)",
      factor: 1,
    },
    {
      min: 1,
      max: 1,
      base: 0,
      top: 0,
      name: "(nicht messbar)",
      factor: 1,
    },
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

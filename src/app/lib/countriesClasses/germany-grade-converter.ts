import { ICountryConverter } from "@/src/app/lib/interfaces/i-grade-converter";

interface GradeRange {
  min: number;
  max: number;
  base: number; // Nota base en el sistema español o italiano
  factor?: number; // Factor para ajustar dentro del rango
  name?: string; // Descripción opcional del rango
  top: number; // Nota máxima del rango
}

export class GermanyGradeConverter implements ICountryConverter {
  private gradeRanges: GradeRange[] = [
    { min: 1.0, max: 1.5, base: 9, top: 10, factor: 0.20 }, // 9.0 - 10.0 (por cada 1 unidad en alemania, en españa son 0.20, (1 punto /5 unidades alemania))
    { min: 1.6, max: 2.0, base: 8.0, top: 8.9, factor: 0.20 }, // 8 - 8.9 (por cada 1 unidad en alemania, en españa son 0.20, (1 punto /5 unidades alemania))
    { min: 2.1, max: 3.0, base: 7.0, top: 7.9, factor: 0.1}, //  7.0 - 7.9 (por cada 1 unidad en alemania, en españa son 0.099, (1 punto /10 unidades alemania))
    { min: 3.1, max: 3.5, base: 6.0, top: 6.9, factor: 0.20 }, // 6 - 6.9 (por cada 1 unidad en alemania, en españa son 0.20, (1 punto /5 unidades alemania))
    { min: 3.6, max: 4.0, base: 5.0, top: 5.9, factor: 0.20 }, // 5.0 - 5.9  (por cada 1 unidad en alemania, en españa son 0.20, (1 punto /5 unidades alemania))
    { min: 4.1, max: 5.0, base: 0, top: 4.9, factor: 0.5 }, // 0 - 4.9 (por cada 1 unidad en alemania, en españa son 0.499, (1 punto /2 unidades alemania))
  ];

  convertToDestinationCountry(grade: number): string {
    for (const range of this.gradeRanges) {
      if (grade >= range.base && grade <= range.top) {
        return (range.max - (grade - range.base) / range.factor / 10).toFixed(
          2
        );
      }
    }
    return "0";
  }

  convertToSpain(grade: string): string {
    const NewGrade = parseFloat(grade);
    for (const range of this.gradeRanges) {
      if (NewGrade >= range.min && NewGrade <= range.max) {
        return (range.top - (NewGrade - range.min) * range.factor * 10).toFixed(
          2
        );
      }
    }
    return "0";
  }
}

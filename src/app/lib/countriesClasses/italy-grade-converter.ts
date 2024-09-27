import { ICountryConverter } from "@/src/app/lib/interfaces/i-grade-converter";
interface GradeRange {
  min: number;
  max: number;
  base: number; // Nota base en el sistema español
  factor?: number; // Factor para ajustar dentro del rango
}

export class ItalyGradeConverter implements ICountryConverter {
  private gradeRanges: GradeRange[] = [
    { min: 30, max: 30, base: 9.5, factor: 0.5 }, // 30 a 9.5, y si es cum laude llega a 10
    { min: 29, max: 29, base: 9  },
    { min: 26, max: 28, base: 7.5, factor: 1.5 / 3 }, // De 7.5 a 9 (1.5 puntos distribuidos en 3 unidades)
    { min: 22, max: 25, base: 6, factor: 1.5 / 4 }, // De 6 a 7.5 (1.5 puntos distribuidos en 4 unidades)
    { min: 18, max: 21, base: 5, factor: 1 / 4 }, // De 5 a 6 (1 punto distribuido en 4 unidades)
    { min: 0, max: 17, base: 0, factor: 5 / 18 }, // De 0 a 5 (5 puntos distribuidos en 18 unidades)
  ];
  convertToDestinationCountry(grade: number): string {
    if (grade === 10) return "30 Cum Laude";
      for (const range of this.gradeRanges) {
        // Si la nota española cae dentro del rango de este grupo
        if (
          grade >= range.base &&
          (!range.factor ||
            grade <= range.base + range.factor * (range.max - range.min))
        ) {
          if (range.factor) {
            // Usamos la fórmula inversa para calcular la nota italiana
            return (range.min + (grade - range.base) / range.factor).toFixed(2);
          }
          return range.min.toString(); // Si no hay factor, devolvemos la mínima del rango italiano
        }
      }

    return "0";
  }
  convertToSpain(grade: number): string {
    if (grade === 31) return "10";
    for (const range of this.gradeRanges) {
        if (grade >= range.min && grade <= range.max) {
            // Si el rango tiene un factor, ajustamos la nota proporcionalmente
            if (range.factor) {
                return (range.base + (grade - range.min) * range.factor).toFixed(2);
            }
            return (range.base).toString(); // Si no hay factor, devolvemos la base directamente
        }
    }
    return "0";
  }
}

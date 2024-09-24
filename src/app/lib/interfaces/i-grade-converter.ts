import { Country } from "../countries";

export interface IGradeConverter {
  convert(grade: number, countryFrom: Country, countryTo: Country): string;
}

export interface ICountryConverter {
  convertFrom(grade: number): string; // Convertir al sistema español
  convertTo(grade: number): string; // Convertir al sistema a españa
}

export class GeneralGradeConverter implements IGradeConverter {
  convert(grade: number, countryFrom: Country, countryTo: Country): string {
    const fromConverter = countryFrom.gradeConverter;
    const toConverter = countryTo.gradeConverter;
    const gradeInSpain = fromConverter.convertFrom(grade); // Convertir al sistema español
    return toConverter.convertTo(Number(gradeInSpain)); // Convertir al sistema del país destino
  }
}
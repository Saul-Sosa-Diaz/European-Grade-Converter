import { Country } from "../countries";

export interface IGradeConverter {
  convert(grade: number, countryFrom: Country, countryTo: Country): string;
}

export interface ICountryConverter {
  convertToSpain(grade: number): string; // Convertir al sistema español
  convertToDestinationCountry(grade: number): string; // Convertir al sistema del país destino
}

export class GeneralGradeConverter implements IGradeConverter {
  convert(grade: number, countryFrom: Country, countryTo: Country): string {
    const fromConverter = countryFrom.gradeConverter;
    const toConverter = countryTo.gradeConverter;
    const gradeInSpain = fromConverter.convertToSpain(grade); // Convertir al sistema español
    return toConverter.convertToDestinationCountry(Number(gradeInSpain)); // Convertir al sistema del país destino
  }
}
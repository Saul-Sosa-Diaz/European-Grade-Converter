import { ICountryConverter } from "@/src/app/lib/interfaces/i-grade-converter";
import { FranceGradeConverter } from "@/src/app/lib/countriesClasses/france-grade-converter";
import { DenmarkGradeConverter } from "@/src/app/lib/countriesClasses/denmark-grade-converter";
import { IrelandGradeConverter } from "@/src/app/lib/countriesClasses/ireland-grade-converter";
import { SpainGradeConverter } from "@/src/app/lib/countriesClasses/spain-grade-converter";
import { UnitedKingdomGradeConverter } from "./countriesClasses/united-kingdom-grade-converter";
import { BelgiumGradeConverter } from "./countriesClasses/belgium-grade-converter";
import { AustriaGradeConverter } from "./countriesClasses/austria-grade-converter";
import { BulgariaGradeConverter } from "./countriesClasses/czech-republic-grade-converter";
import { CzechRepublicGradeConverter } from "./countriesClasses/bulgaria-grade-converter";
import { ItalySalernoGradeConverter } from "./countriesClasses/italy-salerno-grade-converter";
import { ItalyBoloniaGradeConverter } from "./countriesClasses/italy-bolonia-grade-converter";
import { PortugalGradeConverter } from "./countriesClasses/portugal-grade-converter";
import { GermanyGradeConverter } from "./countriesClasses/germany-grade-converter";
import { GreeceGradeConverter } from "./countriesClasses/greece-grade-converter";
import { NorwayGradeConverter } from "./countriesClasses/norway-grade-converter";
import { PolandGradeConverter } from "./countriesClasses/poland-grade-converter";


export interface Country {
  label: string;
  code?: string;
  key: string;
  selectable?: boolean;
  minGrade: number;
  maxGrade: number;
  gradeConverter?: ICountryConverter;
  suffix?: string;
  grades?: number[];
  decimalPlaces: number;
  aditionalInfo?: string;
  children?: Country[];
}


// Hacer uno para los hoja y otro para los padres

export const COUNTRIES: Country[]= [
  {
    key: "0",
    selectable: false,
    label: "Italy",
    code: "IT",
    minGrade: 0,
    maxGrade: 31,
    decimalPlaces: 0,
    children: [
      {
        label: "Salermo",
        key: "0-0",
        minGrade: 0,
        maxGrade: 31,
        gradeConverter: new ItalySalernoGradeConverter(),
        decimalPlaces: 0,
        aditionalInfo:
          "Insert an integer number between 0 and 30. To write Cum Laude, write 30L",
      },
      {
        label: "Bolonia",
        key: "0-1",
        minGrade: 0,
        maxGrade: 31,
        gradeConverter: new ItalyBoloniaGradeConverter(),
        decimalPlaces: 0,
        aditionalInfo:
          "Insert a number between 0 and 30. Type '30 cum Laude' as '30L'",
      },
    ],
  },
  {
    key: "1",
    code: "FR",
    label: "France",
    minGrade: 0,
    maxGrade: 20,
    gradeConverter: new FranceGradeConverter(),
    decimalPlaces: 1,
    aditionalInfo: "Insert a number between 0 and 20",
  },
  {
    key: "2",
    code: "ES",
    label: "Spain",
    minGrade: 0,
    maxGrade: 10,
    gradeConverter: new SpainGradeConverter(),
    decimalPlaces: 1,
    aditionalInfo: "Insert a number between 0 and 10",
  },
  {
    key: "3",
    label: "Ireland",
    code: "IE",
    minGrade: 0,
    maxGrade: 100,
    gradeConverter: new IrelandGradeConverter(),
    decimalPlaces: 0,
    suffix: "%",
    aditionalInfo: "Insert an integer number between 0 and 100",
  },
  {
    key: "4",
    label: "United Kingdom",
    code: "GB",
    minGrade: 0,
    maxGrade: 100,
    gradeConverter: new UnitedKingdomGradeConverter(),
    decimalPlaces: 0,
    suffix: "%",
    aditionalInfo: "Insert an integer number between 0 and 100",
  },
  {
    key: "5",
    label: "Belgium",
    code: "BE",
    minGrade: 0,
    maxGrade: 20,
    gradeConverter: new BelgiumGradeConverter(),
    decimalPlaces: 2,
    aditionalInfo: "Insert a number with a maximum of 2 decimal places",
  },
  {
    key: "6",
    label: "Portugal",
    code: "PT",
    minGrade: 0,
    maxGrade: 20,
    gradeConverter: new PortugalGradeConverter(),
    decimalPlaces: 2,
    aditionalInfo: "Insert a number with a maximum of 2 decimal places",
  },
  {
    key: "7",
    label: "Denmark",
    code: "DK",
    minGrade: 0,
    grades: [0, 2, 4, 7, 10, 12],
    maxGrade: 12,
    gradeConverter: new DenmarkGradeConverter(),
    decimalPlaces: 0,
  },
  {
    key: "8",
    label: "Austria",
    code: "AT",
    minGrade: 1,
    grades: [4, 3, 2, 1],
    maxGrade: 4,
    gradeConverter: new AustriaGradeConverter(),
    decimalPlaces: 0,
  },
  {
    key: "9",
    label: "Bulgaria",
    code: "BG",
    minGrade: 3,
    grades: [3, 4, 5, 6],
    maxGrade: 6,
    gradeConverter: new BulgariaGradeConverter(),
    decimalPlaces: 0,
  },
  {
    key: "10",
    label: "Czech Republic",
    code: "CZ",
    minGrade: 1,
    grades: [3, 2.5, 2, 1.5, 1],
    maxGrade: 3,
    gradeConverter: new CzechRepublicGradeConverter(),
    decimalPlaces: 0,
  },
  {
    key: "11",
    label: "Germany",
    code: "DE",
    minGrade: 1,
    maxGrade: 5,
    gradeConverter: new GermanyGradeConverter(),
    decimalPlaces: 2,
  },
  {
    key: "12",
    label: "Greece",
    code: "GR",
    minGrade: 0,
    maxGrade: 10,
    gradeConverter: new GreeceGradeConverter(),
    decimalPlaces: 2,
  },
  {
    key: "13",
    label: "Norway",
    code: "NO",
    minGrade: 0,
    grades: [2, 3, 4, 5, 6],
    maxGrade: 6,
    gradeConverter: new NorwayGradeConverter(),
    decimalPlaces: 0,
  },
  {
    key: "14",
    label: "Poland",
    code: "PL",
    minGrade: 0,
    grades: [3, 3.5, 4, 4.5, 5],
    maxGrade: 5,
    gradeConverter: new PolandGradeConverter(),
    decimalPlaces: 1,
  },
].sort((a, b) => a.label.localeCompare(b.label));;


export function findCountryByKey(key: string): Country | undefined {
  for (const country of COUNTRIES) {
    // Si el país coincide con el código proporcionado
    if (country.key === key) {
      return country;
    }

    // Si el país tiene hijos, recorremos sus children
    if (country.children) {
      for (const child of country.children) {
        if (child.key === key) {
          return child;
        }
      }
    }
  }
  // Si no se encontró, devolvemos undefined
  return undefined;
}

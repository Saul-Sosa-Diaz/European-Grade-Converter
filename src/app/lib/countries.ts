import { ICountryConverter } from "@/src/app/lib/interfaces/i-grade-converter";
import { FranceGradeConverter } from "@/src/app/lib/countriesClasses/france-grade-converter";
import { DenmarkGradeConverter } from "@/src/app/lib/countriesClasses/denmark-grade-converter";
import { IrelandGradeConverter } from "@/src/app/lib/countriesClasses/ireland-grade-converter";
import { SpainGradeConverter } from "@/src/app/lib/countriesClasses/spain-grade-converter";
import { UnitedKingdomGradeConverter } from "./countriesClasses/united-kingdom-grade-converter";
import { BelgiumGradeConverter } from "./countriesClasses/belgium-grade-converter";
import { AustriaGradeConverter } from "./countriesClasses/austria-grade-converter";
import { BulgariaGradeConverter } from "./countriesClasses/czech-republic-grade-converter";
import { CzechRepublicGradeConverter } from "./countriesClasses/bulgaria-grade-converter copy";
import { ItalyGradeConverter } from "./countriesClasses/italy-grade-converter";


export interface Country {
  name: string;
  code: string;
  minGrade: number;
  maxGrade: number;
  gradeConverter: ICountryConverter;
  suffix?: string;
  grades?: number[];
  decimalPlaces: number;
}

export const COUNTRIES: Country[] = [
  {
    name: "France",
    code: "FR",
    minGrade: 0,
    maxGrade: 20,
    gradeConverter: new FranceGradeConverter(),
    decimalPlaces: 2,
  },
  {
    name: "Spain",
    code: "ES",
    minGrade: 0,
    maxGrade: 10,
    gradeConverter: new SpainGradeConverter(),
    decimalPlaces: 2,
  },
  {
    name: "Ireland",
    code: "IE",
    minGrade: 0,
    maxGrade: 100,
    gradeConverter: new IrelandGradeConverter(),
    decimalPlaces: 0,
    suffix: "%",
  },
  {
    name: "Italy",
    code: "IT",
    minGrade: 0,
    maxGrade: 31,
    gradeConverter: new ItalyGradeConverter(),
    decimalPlaces: 0,
  },
  {
    name: "United Kingdom",
    code: "GB",
    minGrade: 0,
    maxGrade: 100,
    gradeConverter: new UnitedKingdomGradeConverter(),
    decimalPlaces: 0,
    suffix: "%",
  },
  {
    name: "Belgium",
    code: "BE",
    minGrade: 0,
    maxGrade: 20,
    gradeConverter: new BelgiumGradeConverter(),
    decimalPlaces: 2,
  },
  {
    name: "Denmark",
    code: "DK",
    minGrade: 0,
    grades: [0, 2, 4, 7, 10, 12],
    maxGrade: 12,
    gradeConverter: new DenmarkGradeConverter(),
    decimalPlaces: 0,
  },
  {
    name: "Austria",
    code: "AT",
    minGrade: 1,
    grades: [4, 3, 2, 1],
    maxGrade: 4,
    gradeConverter: new AustriaGradeConverter(),
    decimalPlaces: 0,
  },
  {
    name: "Bulgaria",
    code: "BG",
    minGrade: 3,
    grades: [3, 4, 5, 6],
    maxGrade: 6,
    gradeConverter: new BulgariaGradeConverter(),
    decimalPlaces: 0,
  },
  {
    name: "Cnzech Republic",
    code: "CZ",
    minGrade: 1,
    grades: [3, 2.5, 2, 1.5, 1],
    maxGrade: 3,
    gradeConverter: new CzechRepublicGradeConverter(),
    decimalPlaces: 0,
  },
];

import { ICountryConverter } from "@/src/app/lib/interfaces/i-grade-converter";
import { FranceGradeConverter } from "@/src/app/lib/countriesClasses/france-grade-converter";
import { DenmarkGradeConverter } from "@/src/app/lib/countriesClasses/denmark-grade-converter";
import { IrelandGradeConverter } from "@/src/app/lib/countriesClasses/ireland-grade-converter";
import { SpainGradeConverter } from "@/src/app/lib/countriesClasses/spain-grade-converter";
import { UnitedKingdomGradeConverter } from "./countriesClasses/united-kingdom-grade-converter";
import { BelgiumGradeConverter } from "./countriesClasses/belgium-grade-converter";
import { AustriaGradeConverter } from "./countriesClasses/austria-grade-converter";


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
];

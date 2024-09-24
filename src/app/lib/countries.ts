import { IGradeConverter } from "@/src/app/lib/interfaces/i-grade-converter";
import { FranceGradeConverter } from "@/src/app/lib/countriesClasses/france-grade-converter";
import { DenmarkGradeConverter } from "@/src/app/lib/countriesClasses/denmark-grade-converter";
import { IrelandGradeConverter } from "@/src/app/lib/countriesClasses/ireland-grade-converter";
import { SloveniaGradeConverter } from "@/src/app/lib/countriesClasses/slovenia-grade-converter";
import { SpainGradeConverter } from "@/src/app/lib/countriesClasses/spain-grade-converter";


export interface Country {
  name: string;
  code: string;
  minGrade: number;
  maxGrade: number;
  converter: IGradeConverter;
}

export const COUNTRIES: Country[] = [
  {
    name: "France",
    code: "FR",
    minGrade: 0,
    maxGrade: 20,
    converter: new FranceGradeConverter(),
  },
  {
    name: "Spain",
    code: "ES",
    minGrade: 0,
    maxGrade: 10,
    converter: new SpainGradeConverter(),
  },
  {
    name: "Slovenia",
    code: "SI",
    minGrade: 2,
    maxGrade: 5,
    converter: new SloveniaGradeConverter(),
  },
  {
    name: "Ireland",
    code: "IE",
    minGrade: 0,
    maxGrade: 100,
    converter: new IrelandGradeConverter(),
  },
  {
    name: "Denmark",
    code: "DK",
    minGrade: 0,
    maxGrade: 12,
    converter: new DenmarkGradeConverter(),
  },
];

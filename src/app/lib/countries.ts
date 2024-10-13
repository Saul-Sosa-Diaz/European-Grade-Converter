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
import { ItalyBoloniaScienceGradeConverter } from "./countriesClasses/italy-bolonia-science-grade-converter";
import { PortugalGradeConverter } from "./countriesClasses/portugal-grade-converter";
import { GermanyGradeConverter } from "./countriesClasses/germany-grade-converter";
import { GreeceGradeConverter } from "./countriesClasses/greece-grade-converter";
import { NorwayGradeConverter } from "./countriesClasses/norway-grade-converter";
import { PolandGradeConverter } from "./countriesClasses/poland-grade-converter";
import { SloveniaGradeConverter } from "./countriesClasses/slovenia-grade-converter";
import { SwitzerlandGradeConverter } from "./countriesClasses/switzerland-grade-converter";
import {ItalyBoloniaEngineeringGradeConverter} from "./countriesClasses/italy-bolonia-engineering-grade-converter";


export interface Country {
  label: string;
  code?: string;
  key: string;
  selectable?: boolean;
  gradeConverter?: ICountryConverter;
  validGrades?: string[];
  suffix?: string;
  input?: boolean;
  aditionalInfo?: string;
  children?: Country[];
  url?: string;
  document_url?: string;
}

function generateGrades(
  inicio: number,
  fin: number,
  paso: number
): string[] {
  const resultado: string[] = [];
  for (let i = inicio; i <= fin + paso; i += paso) {
    // Redondeamos el número a dos decimales
    resultado.push(String(parseFloat(i.toFixed(2))));
  }
  return resultado;
}

// Hacer uno para los hoja y otro para los padres

export const COUNTRIES: Country[] = [
  {
    key: "0",
    selectable: false,
    label: "Italy",
    code: "IT",
    input: true,
    children: [
      {
        label: "Salerno",
        key: "0-0",
        code: "IT",
        gradeConverter: new ItalySalernoGradeConverter(),
        validGrades: generateGrades(0, 30, 1).concat("30L"),
        input: true,
        aditionalInfo:
          "Insert an integer number between 0 and 30. To write Cum Laude, write 30L",
      },
      {
        label: "Bolonia",
        key: "0-1",
        code: "IT",
        selectable: false,
        input: true,
        validGrades: generateGrades(0, 30, 1).concat("30L"),
        aditionalInfo:
          "Insert a number between 0 and 30. Type '30 cum Laude' as '30L'",
        children: [
          {
            label: "Bolonia Science",
            key: "0-1-0",
            code: "IT",
            input: true,
            validGrades: generateGrades(0, 30, 1).concat("30L"),
            aditionalInfo:
              "Insert a number between 0 and 30. Type '30 cum Laude' as '30L'",
            gradeConverter: new ItalyBoloniaScienceGradeConverter(),
            url: "https://www.unibo.it/it/studiare/guida-alla-scelta-del-corso/sistema-universitario/ects-label/tabelle-di-conversione-dei-voti-nella-scala-ects/tabelle-ects-a-a-2024-25",
            document_url:
              "https://www.unibo.it/it/studiare/guida-alla-scelta-del-corso/sistema-universitario/ects-label/tabelle-di-conversione-dei-voti-nella-scala-ects/tabelle-ects-a-a-2024-25/area-isced-05-2013-natural-sciences-mathematics-and-statistics/@@download/file/Unibo_ECTS_gradingtables_24-25_AreaISCED_05%20%E2%80%93%20Natural%20sciences,%20mathematics%20and%20statistics.pdf",
          },
          {
            label: "Bolonia Engineering",
            key: "0-1-1",
            code: "IT",
            input: true,
            validGrades: generateGrades(0, 30, 1).concat("30L"),
            aditionalInfo:
              "Insert a number between 0 and 30. Type '30 cum Laude' as '30L'",
            gradeConverter: new ItalyBoloniaEngineeringGradeConverter(),
            url: "https://www.unibo.it/it/studiare/guida-alla-scelta-del-corso/sistema-universitario/ects-label/tabelle-di-conversione-dei-voti-nella-scala-ects/tabelle-ects-a-a-2024-25",
            document_url:
              "https://www.unibo.it/it/studiare/guida-alla-scelta-del-corso/sistema-universitario/ects-label/tabelle-di-conversione-dei-voti-nella-scala-ects/tabelle-ects-a-a-2024-25/area-isced-06-2013-information-and-communication-technologies-e-area-isced-07-engineering-manufactoring-and-construction/@@download/file/Unibo_ECTS_gradingtables_24-25_AreeISCED_06%20e%2007%20%E2%80%93%20Information%20and%20comm%20tech%20and%20Engineering,%20manufactoring%20and%20co.pdf",
          },
        ],
      },
    ],
  },
  {
    key: "1",
    code: "FR",
    label: "France",
    input: true,
    validGrades: generateGrades(0, 20, 0.1),
    gradeConverter: new FranceGradeConverter(),
    aditionalInfo: "Insert a number between 0 and 20",
  },
  {
    key: "2",
    code: "ES",
    label: "Spain",
    input: true,
    validGrades: generateGrades(0, 10, 0.01),
    gradeConverter: new SpainGradeConverter(),
    aditionalInfo: "Insert a number between 0 and 10",
  },
  {
    key: "3",
    label: "Ireland",
    input: true,
    code: "IE",
    validGrades: generateGrades(0, 100, 1),
    gradeConverter: new IrelandGradeConverter(),
    suffix: "%",
    aditionalInfo: "Insert an integer number between 0 and 100",
  },
  {
    key: "4",
    label: "United Kingdom",
    code: "GB",
    input: true,
    validGrades: generateGrades(0, 100, 1),
    gradeConverter: new UnitedKingdomGradeConverter(),
    suffix: "%",
    aditionalInfo: "Insert an integer number between 0 and 100",
  },
  {
    key: "5",
    label: "Belgium",
    code: "BE",
    input: true,
    validGrades: generateGrades(0, 20, 0.01),
    gradeConverter: new BelgiumGradeConverter(),
    aditionalInfo: "Insert a number with a maximum of 2 decimal places",
  },
  {
    key: "6",
    label: "Portugal",
    code: "PT",
    input: true,
    validGrades: generateGrades(0, 20, 0.1),
    gradeConverter: new PortugalGradeConverter(),
    aditionalInfo: "Insert a number with a maximum of 2 decimal places",
  },
  {
    key: "7",
    label: "Denmark",
    code: "DK",
    input: false,
    validGrades: ["0", "2", "4", "7", "10", "12"],
    gradeConverter: new DenmarkGradeConverter(),
  },
  {
    key: "8",
    label: "Austria",
    code: "AT",
    input: false,
    validGrades: ["4", "3", "2", "1"],
    gradeConverter: new AustriaGradeConverter(),
  },
  {
    key: "9",
    label: "Bulgaria",
    code: "BG",
    input: false,
    validGrades: ["3", "4", "5", "6"],
    gradeConverter: new BulgariaGradeConverter(),
  },
  {
    key: "10",
    label: "Czech Republic",
    code: "CZ",
    input: false,
    validGrades: ["3", "2.5", "2", "1.5", "1"],
    gradeConverter: new CzechRepublicGradeConverter(),
  },
  {
    key: "11",
    label: "Germany",
    code: "DE",
    input: true,
    validGrades: generateGrades(1, 5, 0.01),
    gradeConverter: new GermanyGradeConverter(),
  },
  {
    key: "12",
    label: "Greece",
    code: "GR",
    input: true,
    validGrades: generateGrades(0, 10, 0.01),
    gradeConverter: new GreeceGradeConverter(),
  },
  {
    key: "13",
    label: "Norway",
    code: "NO",
    input: false,
    validGrades: ["2", "3", "4", "5", "6"],
    gradeConverter: new NorwayGradeConverter(),
  },
  {
    key: "14",
    label: "Poland",
    code: "PL",
    input: false,
    validGrades: ["3", "3.5", "4", "4.5", "5"],
    gradeConverter: new PolandGradeConverter(),
  },
  {
    key: "15",
    label: "Slovenia",
    code: "SI",
    input: false,
    validGrades: ["3", "3.5", "4", "4.5", "5"],
    gradeConverter: new SloveniaGradeConverter(),
  },
  {
    key: "16",
    label: "Switzerland",
    code: "CH",
    input: false,
    validGrades: ["4", "4.5", "5", "5.5", "6"],
    gradeConverter: new SwitzerlandGradeConverter(),
  },
].sort((a, b) => a.label.localeCompare(b.label));;


export function findCountryByKey(key: string): Country | undefined {
  function searchCountry(country: Country, key: string): Country | undefined {
    if (country.key === key) {
      return country;
    }

    if (country.children) {
      for (const child of country.children) {
        const result = searchCountry(child, key);
        if (result) {
          return result;
        }
      }
    }

    return undefined;
  }

  for (const country of COUNTRIES) {
    const result = searchCountry(country, key);
    if (result) {
      return result;
    }
  }

  return undefined;
}
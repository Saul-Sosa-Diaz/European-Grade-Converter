import { ICountryConverter } from "@/src/lib/interfaces/i-grade-converter";

export type Country = {
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
  document_url?: string;
  url?: string;
}
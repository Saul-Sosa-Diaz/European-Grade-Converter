import { ICountryConverter } from "@/src/lib/interfaces/i-grade-converter";

export class PolandGradeConverter implements ICountryConverter {
  convertToDestinationCountry(grade: number): string {
    if (grade >= 9) return "5 (Very good- bardzo dobry)";
    if (grade >= 8) return "4+ (Better than good)";
    if (grade >= 7) return "4 (Good - dobry)";
    if (grade >= 6) return "3+ (Better than satisfactory)";
    if (grade >= 5) return "3 (Satisfactory - dostateczny)";
    return "2 (fail - niedostateczny)";
  }

  convertToSpain(grade: string): string {
    console.log(grade);
    if (grade === "5") return "9.5";
    if (grade === "4+") return "8.5";
    if (grade === "4") return "7.5";
    if (grade === "3+") return "6.5";
    if (grade === "3") return "5.5";
    console.log("2.5");
    return "2.5";
  }
}

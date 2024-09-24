import { IGradeConverter } from '@/src/app/lib/interfaces/i-grade-converter';

export class SpainGradeConverter implements IGradeConverter {
  convert(grade: number): string {
    return (grade * 2).toString();
  }
}

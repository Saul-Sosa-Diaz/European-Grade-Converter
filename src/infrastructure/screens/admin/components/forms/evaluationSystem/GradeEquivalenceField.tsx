import { EuropeanEquivalence, EvaluationType } from "@/domain/evaluationSystem/evaluationSystem";
import { ErrorMessage, Field } from "formik";
import { InputType } from "./EvaluationSystemForm";

interface GradeEquivalenceInput {
  inputType: InputType;
  gradeValue: string;
  MinIntervalGrade?: number;
  MaxIntervalGrade?: number;
  gradeName: string;
  europeanEquivalence: EuropeanEquivalence;
}

interface GradeEquivalenceFieldsProps {
  evaluationType: EvaluationType;
  gradeEquivalence: GradeEquivalenceInput[];
  europeanGrades: EuropeanEquivalence[];
  fixed: number;
  isUpdating: boolean;
  getStep: (fixed: number) => number;
}

export const GradeEquivalenceFields = ({
  evaluationType,
  gradeEquivalence,
  fixed,
  isUpdating,
  getStep,
}: GradeEquivalenceFieldsProps) => {
  if (evaluationType === EvaluationType.DISCRETE) {
    return (
      <>
        {gradeEquivalence.map((entry, index) => (
          <div key={index}>
            <strong>{gradeEquivalence[index].europeanEquivalence}</strong>
            <Field name={`gradeEquivalence.${index}.gradeValue`} type="text" />
            <ErrorMessage name={`gradeEquivalence.${index}.gradeValue`} component="div" className="text-error" />
          </div>
        ))}
      </>
    );
  }

  return (
    <>
      {gradeEquivalence.map((entry, index) => (
        <div key={index}>
          <strong>{gradeEquivalence[index].europeanEquivalence}</strong>
          {!isUpdating && <div>
            <label>
              <Field
                type="radio"
                name={`gradeEquivalence.${index}.inputType`}
                value={InputType.INTERVAL}
              />
              Interval
            </label>
            <label style={{ marginLeft: '1rem' }}>
              <Field
                type="radio"
                name={`gradeEquivalence.${index}.inputType`}
                value={InputType.DISCRETE}
              />
              Discrete value
            </label>
          </div>}

          {entry && entry.inputType === InputType.INTERVAL ? (
            <>
              <div>
                <label>Bottom limit of the interval</label>
                <Field
                  name={`gradeEquivalence.${index}.MinIntervalGrade`}
                  type="number"
                  step={getStep(fixed)}
                />
                <ErrorMessage
                  name={`gradeEquivalence.${index}.MinIntervalGrade`}
                  component="div"
                  className="text-error"
                />
              </div>
              <div>
                <label>Top limit of the interval</label>
                <Field
                  name={`gradeEquivalence.${index}.MaxIntervalGrade`}
                  type="number"
                  step={getStep(fixed)}
                />
                <ErrorMessage
                  name={`gradeEquivalence.${index}.MaxIntervalGrade`}
                  component="div"
                  className="text-error"
                />
              </div>
            </>
          ) : (
            <div>
              <label>Discrete value</label>
              <Field name={`gradeEquivalence.${index}.gradeValue`} type="text" />
              <ErrorMessage
                name={`gradeEquivalence.${index}.gradeValue`}
                component="div"
                className="text-error"
              />
            </div>
          )}
          <label>Grade Name</label>
          <Field
            name={`gradeEquivalence.${index}.gradeName`}
            type="text"
          />
          <ErrorMessage
            name={`gradeEquivalence.${index}.gradeName`}
            component="div"
            className="text-error"
          />
        </div>
      ))}
    </>
  );
};

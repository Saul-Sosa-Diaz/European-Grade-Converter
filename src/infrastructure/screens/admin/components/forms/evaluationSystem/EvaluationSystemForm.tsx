import { EvaluationSystem, EvaluationType } from '@/domain/evaluationSystem/evaluationSystem';
import { University } from '@/domain/university/university';
import { useGetContinuousGradeConversionListByEvaluationID } from '@/hooks/evaluationSystem/useGetContinuousGradeConversion';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { generateGrades } from '../../../../../../../scripts/validGrades.mjs';

interface EvaluationSystemFormProps {
  initialValues: EvaluationSystem;
  onSubmit: (values: EvaluationSystem) => void;
  universityList: University[];
}

const validationSchema = Yup.object().shape({
  evaluationSystemName: Yup.string().required('Required'),
  minGrade: Yup.number().required('Required'),
  maxGrade: Yup.number()
    .required('Required')
    .min(Yup.ref('minGrade'), 'Max grade must be >= min grade'),
  fixed: Yup.number()
    .when('evaluationType', {
      is: (type) => type === EvaluationType.CONTINUOUS,
      then: (schema) => schema.required('Required').min(0).max(5),
      otherwise: (schema) => schema.notRequired(),
    }),

  continuousEquivalences: Yup.array().when('evaluationType', {
    is: EvaluationType.CONTINUOUS,
    then: (schema) =>
      schema
        .of(
          Yup.object().shape({
            MinIntervalGrade: Yup.number()
              .required('Required')
              .min(Yup.ref('$minGrade'), ({ min }) => `The value must be >= ${min}`)
              .test('min<=max', 'The min part has to be <= than the max part of the interval.', function (value) {
                return value <= this.parent.MaxIntervalGrade;
              }),

            MaxIntervalGrade: Yup.number()
              .required('Required')
              .test('max>=min', 'Max must be >= Min', function (value) {
                return value >= this.parent.MinIntervalGrade;
              })
              .max(Yup.ref('$maxGrade'), ({ max }) => `The value must be <= ${max}`),

            gradeName: Yup.string().required('Required'),
          })
        )
    ,
    otherwise: Yup.array(),
  }),
});

export const EvaluationSystemForm = ({
  initialValues,
  onSubmit,
  universityList
}: EvaluationSystemFormProps) => {
  const { getContinouosGradeConversionListByEvaluationID, isFetched } =
    useGetContinuousGradeConversionListByEvaluationID({
      evaluationSystemID: initialValues.evaluationSystemID
    });

  const europeanGrade = ['F', 'E', 'D', 'C', 'B', 'A'];
  const [gradeConversionFromBack, setGradeConversionFromBack] = useState(europeanGrade.map((grade) => ({
    MinIntervalGrade: 0,
    MaxIntervalGrade: 0,
    gradeName: ''
  })));

  const formValues = {
    ...initialValues,
    continuousEquivalences: gradeConversionFromBack,
    maxGrade: parseFloat(initialValues.validGrades[initialValues.validGrades.length - 1]),
    minGrade: parseFloat(initialValues.validGrades[0])
  };

  useEffect(() => {
    if (isFetched) {
      setGradeConversionFromBack(getContinouosGradeConversionListByEvaluationID.map((gradeConversion) => ({
        MinIntervalGrade: gradeConversion.MinIntervalGrade,
        MaxIntervalGrade: gradeConversion.MaxIntervalGrade,
        gradeName: gradeConversion.gradeName
      })));
    }
  }, [isFetched, getContinouosGradeConversionListByEvaluationID]);


  return (
    <Formik
      initialValues={formValues}
      validationSchema={validationSchema}
      enableReinitialize={true}
      onSubmit={(updatedEvaluationSystem) => {
        const updatedValues: EvaluationSystem = {
          validGrades: generateGrades(
            updatedEvaluationSystem.minGrade,
            updatedEvaluationSystem.maxGrade,
            1 / Math.pow(10, updatedEvaluationSystem.fixed)
          ),
          evaluationSystemID: updatedEvaluationSystem.evaluationSystemID,
          evaluationSystemName: updatedEvaluationSystem.evaluationSystemName,
          evaluationType: updatedEvaluationSystem.evaluationType,
          fixed: updatedEvaluationSystem.fixed,
          universityID: updatedEvaluationSystem.universityID,
          universityName: universityList.find(
            (university) => university.id === updatedEvaluationSystem.universityID
          ).name,
        };

        onSubmit(updatedValues);
      }}
    >
      {({ values }) => (
        <Form>
          <div>
            <label>Name of the system</label>
            <Field name="evaluationSystemName" />
            <ErrorMessage name="evaluationSystemName" component="div" className="text-error" />
          </div>

          <div>
            <label>Evaluation type</label>
            <Field as="select" name="evaluationType">
              {Object.values(EvaluationType).map((type) => (
                <option key={type} value={type}>
                  {type.toUpperCase()}
                </option>
              ))}
            </Field>
          </div>

          {/* University */}

          <div>
            <label>Valid Grades</label>
            {values.evaluationType === EvaluationType.DISCRETE ? (
              <div>
              </div>
            ) : (
              <>
                <div>
                  <label>Min grade</label>
                  <Field type="number" name="minGrade" />
                </div>
                <div>
                  <label>Max Grade</label>
                  <Field type="number" name="maxGrade" />
                </div>
              </>
            )}
            <ErrorMessage name="validGrades" component="div" className="text-error" />
          </div>

          <div>
            <label>Number of decimals</label>
            <Field
              type="number"
              name="fixed"
              min="0"
              max="5"
            />
            <ErrorMessage name="fixed" component="div" className="text-error" />
          </div>

          {values.evaluationType === EvaluationType.CONTINUOUS && (
            !isFetched ? <ProgressSpinner /> : (
              <div>
                <h3>European equivalences </h3>
                {values.continuousEquivalences.map((interval: any, index: number) => (
                  <div key={index}>
                    <Field
                      name={`continuousEquivalences.${index}.MinIntervalGrade`}
                      type="number"
                      step={1 / Math.pow(10, values.fixed)}
                    />
                    <ErrorMessage name={`continuousEquivalences.${index}.MinIntervalGrade`} component="div" className="text-error" />
                    <Field
                      name={`continuousEquivalences.${index}.MaxIntervalGrade`}
                      type="number"
                      step={1 / Math.pow(10, values.fixed)}
                    />
                    <ErrorMessage name={`continuousEquivalences.${index}.MaxIntervalGrade`} component="div" className="text-error" />
                  </div>
                ))}
              </div>
            )
          )}
          <button type="submit">Save</button>
        </Form>
      )}
    </Formik>
  );
};
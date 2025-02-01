import { GradeConversion, EvaluationSystem, EvaluationSystemWithGradeConversions, EvaluationType, EuropeanEquivalence } from '@/domain/evaluationSystem/evaluationSystem';
import { University } from '@/domain/university/university';
import { useGetGradeConversionListByEvaluationID } from '@/hooks/evaluationSystem/useGetContinuousGradeConversion';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useCallback, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { generateGrades } from '../../../../../../../scripts/validGrades.mjs';
import { Dropdown } from 'primereact/dropdown';

interface EvaluationSystemFormProps {
  initialValues: EvaluationSystem;
  onSubmit: (values: EvaluationSystem) => void;
  universityList: University[];
}

const validationSchema = Yup.object().shape({
  universityName: Yup.string().required('Required'),
  evaluationType: Yup.string().required('Required'),
  evaluationSystemName: Yup.string().required('Required'),
  minGrade: Yup.number().required('Required'),
  maxGrade: Yup.number()
    .required('Required'),
  fixed: Yup.number()
    .when('evaluationType', {
      is: (type) => type === EvaluationType.CONTINUOUS,
      then: (schema) => schema.required('Required').min(0).max(5),
      otherwise: (schema) => schema.notRequired(),
    }),

  gradeEquivalence: Yup.array().when('evaluationType', {
    is: (value: EvaluationType) => value === EvaluationType.CONTINUOUS,
    then: (schema) =>
      schema.of(
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
          gradeName: Yup.string()
        })
      ),
    otherwise: (schema) => schema.notRequired(),
  })
});

export const EvaluationSystemForm = ({
  initialValues,
  onSubmit,
  universityList
}: EvaluationSystemFormProps) => {
  const { getContinouosGradeConversionListByEvaluationID: getGradeConversionListByEvaluationID, isFetched } =
    useGetGradeConversionListByEvaluationID({
      evaluationSystemID: initialValues.evaluationSystemID,
    });

  const europeanGrade = [EuropeanEquivalence.F, EuropeanEquivalence.FX, EuropeanEquivalence.E, EuropeanEquivalence.D, EuropeanEquivalence.C, EuropeanEquivalence.B, EuropeanEquivalence.A];
  const [gradeConversionFromBack, setGradeConversionFromBack] = useState<GradeConversion[]>(europeanGrade.map((grade) => ({
    gradeConversionID: '',
    evaluationSystemID: initialValues.evaluationSystemID,
    MinIntervalGrade: 0,
    MaxIntervalGrade: 0,
    gradeName: '',
    gradeValue: '',
    europeanEquivalence: grade
  })));

  const formValues = {
    ...initialValues,
    gradeEquivalence: gradeConversionFromBack,
    maxGrade: parseFloat(initialValues.validGrades[initialValues.validGrades.length - 1]),
    minGrade: parseFloat(initialValues.validGrades[0])
  };

  useEffect(() => {
    if (isFetched && getGradeConversionListByEvaluationID) {
      const conversions = europeanGrade.map((grade) => {
        const conversionFound = getGradeConversionListByEvaluationID.find(
          (item) => item.europeanEquivalence === grade
        );
        return (
          conversionFound || {
            gradeConversionID: '',
            evaluationSystemID: initialValues.evaluationSystemID,
            MinIntervalGrade: 0,
            MaxIntervalGrade: 0,
            gradeName: '',
            europeanEquivalence: grade,
            gradeValue: ''
          }
        );
      });
      setGradeConversionFromBack(conversions);
    }
  }, [isFetched, getGradeConversionListByEvaluationID]);

  const getStep = useCallback((fixed) => {
    return 1 / Math.pow(10, fixed);
  }, []);

  return (
    <Formik
      initialValues={formValues}
      validationSchema={validationSchema}
      enableReinitialize={true}
      onSubmit={(updatedEvaluationSystem) => {
        const updatedValues: EvaluationSystemWithGradeConversions = {
          validGrades: generateGrades(
            updatedEvaluationSystem.minGrade,
            updatedEvaluationSystem.maxGrade,
            getStep(updatedEvaluationSystem.fixed)
          ),
          evaluationSystemID: updatedEvaluationSystem.evaluationSystemID,
          evaluationSystemName: updatedEvaluationSystem.evaluationSystemName,
          evaluationType: updatedEvaluationSystem.evaluationType,
          fixed: updatedEvaluationSystem.fixed,
          universityID: universityList.find((university) => university.name === updatedEvaluationSystem.universityName).id,
          universityName: updatedEvaluationSystem.universityName,
          gradeConversions: updatedEvaluationSystem.gradeEquivalence.map((interval, index) => ({
            gradeConversionID: interval.gradeConversionID,
            europeanGrade: europeanGrade[index],
            evaluationSystemID: interval.evaluationSystemID,
            ...interval
          }))
        };

        onSubmit(updatedValues);
      }}
    >
      {({ values }) => (
        <Form>
          <div>
            <label htmlFor="universityName">University Name</label>
            <Field name="universityName">
              {({ form }) => (
                <Dropdown
                  id="universityName"
                  value={form.values.universityName}
                  options={universityList.map((university) => ({ label: university.name, value: university.name }))}
                  filter
                  onChange={(e) => form.setFieldValue('universityName', e.value)}
                />
              )}
            </Field>
            <ErrorMessage name="universityName" component="div" className="error" />
          </div>

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
            <ErrorMessage name="evaluationType" component="div" className="text-error" />
          </div>

          <div>
            <label>Valid Grades</label>
            {values.evaluationType === EvaluationType.DISCRETE ? (<>
              <h3>European equivalences </h3>
              <div>
                <strong> </strong>
                {values.gradeEquivalence.map((grade, index) => (
                  <>
                    {europeanGrade[index]}
                    <div key={index}>
                      <Field
                        name={`gradeEquivalence.${index}.gradeValue`}
                        type="text"
                      />
                      <ErrorMessage name={`gradeEquivalence.${index}.gradeValue`} component="div" className="text-error" />
                    </div>
                  </>
                ))}
              </div>
            </>
            ) : (
              <>
                <div>
                  <label>Min grade</label>
                  <Field type="number" name="minGrade" />
                  <ErrorMessage name="maxGrade" component="div" className="text-error" />
                </div>
                <div>
                  <label>Max Grade</label>
                  <Field type="number" name="maxGrade" />
                  <ErrorMessage name="maxGrade" component="div" className="text-error" />
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
              </>
            )}
            <ErrorMessage name="validGrades" component="div" className="text-error" />
          </div>



          {values.evaluationType === EvaluationType.CONTINUOUS && (
            !isFetched && values.evaluationSystemID ? <ProgressSpinner /> : (
              <div>
                <h3>European equivalences </h3>
                {values.gradeEquivalence.map((interval: GradeConversion, index: number) => (
                  values.evaluationSystemID && interval.MinIntervalGrade && interval.MaxIntervalGrade ? (<div key={index}>
                    <strong> {europeanGrade[index]}</strong>
                    <Field
                      name={`gradeEquivalence.${index}.MinIntervalGrade`}
                      type="number"
                      step={getStep(values.fixed)}
                    />
                    <ErrorMessage name={`gradeEquivalence.${index}.MinIntervalGrade`} component="div" className="text-error" />
                    <Field
                      name={`gradeEquivalence.${index}.MaxIntervalGrade`}
                      type="number"
                      step={getStep(values.fixed)}
                    />
                    <ErrorMessage name={`gradeEquivalence.${index}.MaxIntervalGrade`} component="div" className="text-error" />
                  </div>) : (<div key={index}>
                    <strong> {europeanGrade[index]}</strong>
                    <Field
                      name={`gradeEquivalence.${index}.gradeValue`}
                      type="text"
                    />
                    <ErrorMessage name={`gradeEquivalence.${index}.gradeValue`} component="div" className="text-error" />
                  </div>)
                ))}
              </div>
            )
          )}
          <button type="submit">{values.evaluationSystemID ? "Update" : "Create"}</button>
        </Form>
      )}
    </Formik>
  );
};
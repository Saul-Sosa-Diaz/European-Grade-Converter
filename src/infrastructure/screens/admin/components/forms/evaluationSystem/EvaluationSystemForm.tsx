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

const getValidationSchema = (minGrade, maxGrade) => {
  return Yup.object().shape({
    evaluationSystemName: Yup.string().required('Required'),
    evaluationType: Yup.string()
      .oneOf(Object.values(EvaluationType))
      .required('Required'),
    validGrades: Yup.array()
      .of(Yup.string().required())
      .min(1, 'Debe tener al menos una calificación válida'),

    fixed: Yup.number().min(0).required('Required'),
    universityID: Yup.string().required('Required'),

    discreteEquivalences: Yup.array().of(
      Yup.object().shape({
        gradeValue: Yup.string().required('Valor de la nota requerido'),
        baseEquivalentSpanishGrade: Yup.number().required('Equivalencia base requerida'),
        topEquivalentSpanishGrade: Yup.number().required('Equivalencia tope requerida')
      })
    ),

    continuousEquivalences: Yup.array().of(
      Yup.object().shape({
        MinIntervalGrade: Yup.number()
          .required('Required')
          .min(minGrade, `Debe ser >= ${minGrade}`)
          .max(maxGrade, `Debe ser <= ${maxGrade}`),
        MaxIntervalGrade: Yup.number()
          .required('Required')
          .min(minGrade, `Debe ser >= ${minGrade}`)
          .max(maxGrade, `Debe ser <= ${maxGrade}`),
        gradeName: Yup.string().required('Required')
      })
    )
  });
}

export const EvaluationSystemForm = ({
  initialValues,
  onSubmit,
  universityList
}: EvaluationSystemFormProps) => {
  const { getContinouosGradeConversionListByEvaluationID, isFetched } =
    useGetContinuousGradeConversionListByEvaluationID({
      evaluationSystemID: initialValues.evaluationSystemID
    });
  const [fixed, setFixed] = useState(initialValues.fixed);
  const europeanGrade = ['F', 'E', 'D', 'C', 'B', 'A'];
  const [gradeConversionFromBack, setGradeConversionFromBack] = useState(europeanGrade.map((grade) => ({
    MinIntervalGrade: 0,
    MaxIntervalGrade: 0,
    gradeName: ''
  })));

  const formValues = {
    ...initialValues,
    fixed,
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
      validationSchema={getValidationSchema(formValues.minGrade, formValues.maxGrade)}
      enableReinitialize={true}
      validateOnChange={true}
      onSubmit={(updatedEvaluationSystem) => {
        const updatedValues: EvaluationSystem = {
          validGrades: generateGrades(updatedEvaluationSystem.minGrade, updatedEvaluationSystem.maxGrade, 1 / Math.pow(10, updatedEvaluationSystem.fixed)),
          evaluationSystemID: updatedEvaluationSystem.evaluationSystemID,
          evaluationSystemName: updatedEvaluationSystem.evaluationSystemName,
          evaluationType: updatedEvaluationSystem.evaluationType,
          fixed: updatedEvaluationSystem.fixed,
          universityID: updatedEvaluationSystem.universityID,
          universityName: universityList.find((university) => university.id === updatedEvaluationSystem.universityID).name,
        }
        
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
                <div>
                  <label>Number of decimals</label>
                  <Field
                    type="number"
                    name="fixed"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setFixed(parseFloat(event.target.value))
                    }
                  />
                  <ErrorMessage name="fixed" component="div" className="text-error" />
                </div>
              </>
            )}
            <ErrorMessage name="validGrades" component="div" className="text-error" />
          </div>
          {values.evaluationType === EvaluationType.CONTINUOUS && (
            !isFetched ? <ProgressSpinner /> : (
              <div>
                <h3>European equivalences </h3>
                {values.continuousEquivalences.map((interval: any, index: number) => (
                  <div key={index} style={{ marginBottom: '1rem' }}>
                    <div>
                      <label>Equivalence </label> <strong>{europeanGrade[index]}</strong>
                    </div>

                    <div>
                      <label>Bottom Interval</label>
                      <Field
                        name={`continuousEquivalences.${index}.MinIntervalGrade`}
                        type="number"
                        step={1 / Math.pow(10, fixed)}
                      />
                      <ErrorMessage
                        name={`continuousEquivalences.${index}.MinIntervalGrade`}
                        component="div"
                        className="text-error"
                      />
                    </div>

                    <div>
                      <label>Top interval</label>
                      <Field
                        name={`continuousEquivalences.${index}.MaxIntervalGrade`}
                        type="number"
                        step={1 / Math.pow(10, fixed)}
                      />
                      <ErrorMessage
                        name={`continuousEquivalences.${index}.MaxIntervalGrade`}
                        component="div"
                        className="text-error"
                      />
                    </div>
                    <div>
                      <label>Interval Name</label>
                      <Field
                        name={`continuousEquivalences.${index}.gradeName`}
                        type="text"
                        placeholder="Fail, Pass, etc."
                      />
                      <ErrorMessage
                        name={`continuousEquivalences.${index}.gradeName`}
                        component="div"
                        className="text-error"
                      />
                    </div>

                  </div>
                ))}
              </div>)

          )
          }
          <button type="submit">Save</button>
        </Form>

      )}
    </Formik>
  );
};

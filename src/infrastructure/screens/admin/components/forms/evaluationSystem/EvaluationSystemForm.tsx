import { ContinuousGradeConversion, EvaluationSystem, EvaluationType } from '@/domain/evaluationSystem/evaluationSystem';
import { University } from '@/domain/university/university';
import { useGetContinuousGradeConversionListByEvaluationID } from '@/hooks/evaluationSystem/useGetContinuousGradeConversion';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { ProgressSpinner } from 'primereact/progressspinner';
import { use, useEffect, useState } from 'react';
import * as Yup from 'yup';

interface EvaluationSystemFormProps {
  initialValues: EvaluationSystem;
  onSubmit: (values: EvaluationSystem) => void;
  universityList: University[];
}

const validationSchema = Yup.object().shape({
  evaluationSystemName: Yup.string().required('Requerido'),
  evaluationType: Yup.string()
    .oneOf(Object.values(EvaluationType))
    .required('Requerido'),
  validGrades: Yup.array()
    .of(Yup.string().required())
    .min(1, 'Debe tener al menos una calificación válida'),

  fixed: Yup.number().min(0).required('Requerido'),
  universityID: Yup.string().required('Requerido'),

  discreteEquivalences: Yup.array().of(
    Yup.object().shape({
      gradeValue: Yup.string().required('Valor de la nota requerido'),
      baseEquivalentSpanishGrade: Yup.number().required('Equivalencia base requerida'),
      topEquivalentSpanishGrade: Yup.number().required('Equivalencia tope requerida')
    })
  ),

  continuousEquivalences: Yup.array().of(
    Yup.object().shape({
      MinIntervalGrade: Yup.number().required('Mínimo requerido'),
      MaxIntervalGrade: Yup.number().required('Máximo requerido'),
      gradeName: Yup.string().required('Letra requerida')
    })
  )
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
    maxGrade: initialValues.validGrades[initialValues.validGrades.length - 1],
    minGrade: initialValues.validGrades[0]
  };

  const [fixed, setFixed] = useState(initialValues.fixed);

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
      onSubmit={onSubmit}
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
                {/* FieldArray u otro mecanismo para validGrades si lo necesitas */}
                {/* ... */}
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
            !isFetched ? <ProgressSpinner/> : (
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

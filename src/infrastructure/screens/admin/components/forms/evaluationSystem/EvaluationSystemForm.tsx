
import { EvaluationSystem, EvaluationType } from '@/domain/evaluationSystem/evaluationSystem';
import { University } from '@/domain/university/university';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import { useState } from 'react';
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
      baseEquivalentSpanishGrade: Yup.number().required('Equivalencia base requerida'),
      topEquivalentSpanishGrade: Yup.number().required('Equivalencia tope requerida'),
      gradeName: Yup.string().notRequired()
    })
  )
});

export const EvaluationSystemForm = ({
  initialValues,
  onSubmit,
  universityList
}: EvaluationSystemFormProps) => {
  const [formValues] = useState({
    ...initialValues,

    // Para discretas
    discreteEquivalences: initialValues.discreteEquivalences || [
      {
        gradeValue: '',
        baseEquivalentSpanishGrade: '',
        topEquivalentSpanishGrade: ''
      }
    ],

    // Para continuas
    continuousEquivalences: initialValues.continuousEquivalences || [
      {
        MinIntervalGrade: '',
        MaxIntervalGrade: '',
        baseEquivalentSpanishGrade: '',
        topEquivalentSpanishGrade: '',
        gradeName: ''
      }
    ],

    // Calculamos minGrade y maxGrade de validGrades si aplica.
    maxGrade: initialValues.validGrades[initialValues.validGrades.length - 1],
    minGrade: initialValues.validGrades[0]
  });

  const [fixed, setFixed] = useState(initialValues.fixed);

  return (
    <Formik
      initialValues={formValues}
      validationSchema={validationSchema}
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

          <div>
            <label>Valid Grades</label>
            {values.evaluationType === EvaluationType.DISCRETE ? (
              <FieldArray name="validGrades">
                {({ push, remove }) => (
                  <div>
                    {values.validGrades.map((grade: string, index: number) => (
                      <div key={index}>
                        <Field name={`validGrades.${index}`} />
                        <button
                          type="button"
                          onClick={() => remove(index)}
                        >
                          Eliminar
                        </button>
                      </div>
                    ))}
                    <button type="button" onClick={() => push('')}>
                      Add grade
                    </button>
                  </div>
                )}
              </FieldArray>
            ) : (
              // Si es continuo, normalmente vas a usar min y max en vez de un array
              // de strings, pero mantengo este ejemplo por si quieres tomar
              // la lógica de validGrades. 
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

          {values.evaluationType === EvaluationType.DISCRETE && (
            <div>
              <h3>Equivalencias Discretas</h3>
              <FieldArray name="discreteEquivalences">
                {({ push, remove }) => (
                  <div>
                    {values.discreteEquivalences.map(
                      (item: any, index: number) => (
                        <div key={index} style={{ marginBottom: '1rem' }}>
                          <label>Grade Value</label>
                          <Field
                            name={`discreteEquivalences.${index}.gradeValue`}
                            placeholder="Ej: A, B, C, etc."
                          />
                          <ErrorMessage
                            name={`discreteEquivalences.${index}.gradeValue`}
                            component="div"
                            className="text-error"
                          />

                          <label>Base Equivalent</label>
                          <Field
                            name={`discreteEquivalences.${index}.baseEquivalentSpanishGrade`}
                            type="number"
                          />
                          <ErrorMessage
                            name={`discreteEquivalences.${index}.baseEquivalentSpanishGrade`}
                            component="div"
                            className="text-error"
                          />

                          <label>Top Equivalent</label>
                          <Field
                            name={`discreteEquivalences.${index}.topEquivalentSpanishGrade`}
                            type="number"
                          />
                          <ErrorMessage
                            name={`discreteEquivalences.${index}.topEquivalentSpanishGrade`}
                            component="div"
                            className="text-error"
                          />

                          <button type="button" onClick={() => remove(index)}>
                            Eliminar
                          </button>
                        </div>
                      )
                    )}
                    <button
                      type="button"
                      onClick={() =>
                        push({
                          gradeValue: '',
                          baseEquivalentSpanishGrade: '',
                          topEquivalentSpanishGrade: ''
                        })
                      }
                    >
                      Agregar nueva equivalencia
                    </button>
                  </div>
                )}
              </FieldArray>
            </div>
          )}

          {values.evaluationType === EvaluationType.CONTINUOUS && (
            <div>
              <h3>Equivalencias Continuas</h3>
              <FieldArray name="continuousEquivalences">
                {({ push, remove }) => (
                  <div>
                    {values.continuousEquivalences.map((interval, index) => (
                      <div key={index} style={{ marginBottom: '1rem' }}>
                        <label>Mínimo</label>
                        <Field
                          name={`continuousEquivalences.${index}.MinIntervalGrade`}
                          type="number"
                        />
                        <ErrorMessage
                          name={`continuousEquivalences.${index}.MinIntervalGrade`}
                          component="div"
                          className="text-error"
                        />

                        <label>Máximo</label>
                        <Field
                          name={`continuousEquivalences.${index}.MaxIntervalGrade`}
                          type="number"
                        />
                        <ErrorMessage
                          name={`continuousEquivalences.${index}.MaxIntervalGrade`}
                          component="div"
                          className="text-error"
                        />

                        <label>Equivalencia base (ES)</label>
                        <Field
                          name={`continuousEquivalences.${index}.baseEquivalentSpanishGrade`}
                          type="number"
                        />
                        <ErrorMessage
                          name={`continuousEquivalences.${index}.baseEquivalentSpanishGrade`}
                          component="div"
                          className="text-error"
                        />

                        <label>Equivalencia tope (ES)</label>
                        <Field
                          name={`continuousEquivalences.${index}.topEquivalentSpanishGrade`}
                          type="number"
                        />
                        <ErrorMessage
                          name={`continuousEquivalences.${index}.topEquivalentSpanishGrade`}
                          component="div"
                          className="text-error"
                        />

                        <label>Nombre</label>
                        <Field
                          name={`continuousEquivalences.${index}.gradeName`}
                          placeholder="Ej: F, E, D..."
                        />
                        <ErrorMessage
                          name={`continuousEquivalences.${index}.gradeName`}
                          component="div"
                          className="text-error"
                        />

                        <button type="button" onClick={() => remove(index)}>
                          Eliminar
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() =>
                        push({
                          MinIntervalGrade: '',
                          MaxIntervalGrade: '',
                          baseEquivalentSpanishGrade: '',
                          topEquivalentSpanishGrade: '',
                          gradeName: ''
                        })
                      }
                    >
                      Agregar intervalo
                    </button>
                  </div>
                )}
              </FieldArray>
            </div>
          )}


          <button type="submit">Save</button>
        </Form>
      )}
    </Formik>
  );
};
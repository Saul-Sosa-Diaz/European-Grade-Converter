import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Dropdown } from 'primereact/dropdown';
import { EvaluationSystem, EvaluationType } from '@/domain/evaluationSystem/evaluationSystem';
import { University } from '@/domain/university/university';

export const EvaluationSystemForm = ({ initialValue, onSubmit, universityList }: { initialValue: EvaluationSystem, onSubmit: (evaluationSystem: EvaluationSystem) => void, universityList: University[] }) => {
  const [formValues, setFormValues] = useState(initialValue);
  useEffect(() => {
    setFormValues(initialValue);
  }, [initialValue]);

  const validationSchema = Yup.object({
    name: Yup.string()
      .max(255, 'The max length for the university name is 255 characters'),
    university: Yup.string()
      .max(255, 'The max length for the university name is 255 characters')
      .required('The university code is required'),
  });

  return (
    <Formik
      enableReinitialize
      initialValues={formValues}
      validationSchema={validationSchema}
      onSubmit={(values: EvaluationSystem) => {
        const updatedValues = {
          ...values,
          universityID: universityList.find((university) => university.name === values.universityName)?.id || null,
        };
        onSubmit(updatedValues);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <label htmlFor="university">University</label>
            <Field name="university">
              {({ form }) => (
                <Dropdown
                  id="university"
                  value={form.values.university}
                  options={universityList.map((university) => ({ label: university.name, value: university.name }))}
                  filter
                  onChange={(e) => form.setFieldValue('university', e.value)}
                />
              )}
            </Field>
            <ErrorMessage name="university" component="div" className="error" />
          </div>

          <div>
            <label htmlFor="evaluationType">University</label>
            <Field name="evaluationType">
              {({ form }) => (
                <Dropdown
                  id="evaluationType"
                  value={form.values.evaluationType}
                  options={Object.values(EvaluationType)}
                  onChange={(e) => form.setFieldValue('evaluationType', e.value)}
                />
              )}
            </Field>
            <ErrorMessage name="university" component="div" className="error" />
          </div>

          <div>
            <label htmlFor="validGrades">Valid Grades</label>
            <Field name="validGrades" />
            <ErrorMessage name="validGrades" component="div" className="error" />
          </div>
          
          <div>
            <label htmlFor="fixed">Number of decimals</label>
            <Field type="number" name="fixed" min="0" step="1" />
            <ErrorMessage name="fixed" component="div" className="error" />
          </div>

          <button type="submit" disabled={isSubmitting}>
            {formValues.evaluationSystemID ? 'Update' : 'Create'}
          </button>
        </Form>
      )}
    </Formik>
  );
};


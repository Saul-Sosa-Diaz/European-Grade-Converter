import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Country } from '@/domain/country/country';

export const CountryForm = ({ initialValue, onSubmit }: { initialValue: Country, onSubmit: (country: Country) => void }) => {
  const [formValues, setFormValues] = useState(initialValue);

  useEffect(() => {
    setFormValues(initialValue);
  }, [initialValue]);

  const validationSchema = Yup.object({
    name: Yup.string()
      .max(255, 'The max length for the country name is 255 characters')
      .required('The country name is required'),
    code: Yup.string()
      .max(4, 'The max length for the country code is 4 characters')
      .required('The country code is required'),
  });

  return (
    <Formik
      enableReinitialize
      initialValues={formValues}
      validationSchema={validationSchema}
      onSubmit={(values) => onSubmit(values)}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <label htmlFor="name">Country Name</label>
            <Field type="text" name="name" />
            <ErrorMessage name="name" component="div" className="error" />
          </div>

          <div>
            <label htmlFor="code">Country Code</label>
            <Field type="text" name="code" />
            <ErrorMessage name="code" component="div" className="error" />
          </div>

          <button type="submit" disabled={isSubmitting}>
            {formValues.id ? 'Update' : 'Create'}
          </button>
        </Form>
      )}
    </Formik>
  );
};


import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Country } from '@/domain/country/country';

export const CountryForm = ({ initialValue, onSubmit }: { initialValue: Country, onSubmit: () => void }) => {
  const [formValues, setFormValues] = useState(initialValue);

  useEffect(() => {
    setFormValues(initialValue);
  }, [initialValue]);

  const validationSchema = Yup.object({
    countryName: Yup.string()
      .max(255, 'The max length for the country name is 255 characters')
      .required('The country name is required'),
    countryCode: Yup.string()
      .max(4, 'The max length for the country code is 4 characters')
      .required('The country code is required'),
  });
  // TODO: ADD TRANSLATIONS 
  return (
    <Formik
      enableReinitialize
      initialValues={formValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          {/* Hidden field to edit */}
          {formValues.id && <Field type="hidden" name="countryID" />}

          <div>
            <label htmlFor="countryName">Country Name</label>
            <Field type="text" name="countryName" />
            <ErrorMessage name="countryName" component="div" className="error" />
          </div>

          <div>
            <label htmlFor="countryCode">Country Code</label>
            <Field type="text" name="countryCode" />
            <ErrorMessage name="countryCode" component="div" className="error" />
          </div>

          <button type="submit" disabled={isSubmitting}>
            {formValues.id ? 'Actualizar' : 'Crear'}
          </button>
        </Form>
      )}
    </Formik>
  );
};


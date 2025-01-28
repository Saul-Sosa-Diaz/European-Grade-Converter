import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { University } from '@/domain/university/university';
import { Dropdown } from 'primereact/dropdown';
import { Country } from '@/domain/country/country';

export const UniversityForm = ({ initialValue, onSubmit, countryList }: { initialValue: University, onSubmit: (university: University) => void, countryList: Country[] }) => {
  const [formValues, setFormValues] = useState(initialValue);
  useEffect(() => {
    setFormValues(initialValue);
  }, [initialValue]);

  const validationSchema = Yup.object({
    name: Yup.string()
      .max(255, 'The max length for the university name is 255 characters'),
    country: Yup.string()
      .max(255, 'The max length for the country name is 255 characters')
      .required('The country code is required'),
  });

  return (
    <Formik
      enableReinitialize
      initialValues={formValues}
      validationSchema={validationSchema}
      onSubmit={(values: University) => {
        const updatedValues = {
          ...values,
          countryID: countryList.find((country) => country.name === values.country)?.id || null,
        };
        onSubmit(updatedValues);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <label htmlFor="country">Country Name</label>
            <Field name="country">
              {({ form }) => (
                <Dropdown
                  id="country"
                  value={form.values.country}
                  options={countryList.map((country) => ({ label: country.name, value: country.name }))}
                  filter
                  onChange={(e) => form.setFieldValue('country', e.value)}
                />
              )}
            </Field>
            <ErrorMessage name="country" component="div" className="error" />
          </div>

          <div>
            <label htmlFor="name">University Name</label>
            <Field type="text" name="name" />
            <ErrorMessage name="name" component="div" className="error" />
          </div>

          <button type="submit" disabled={isSubmitting}>
            {formValues.id ? 'Update' : 'Create'}
          </button>
        </Form>
      )}
    </Formik>
  );
};


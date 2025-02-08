import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Country } from '@/domain/country/country';
import { Dropdown } from 'primereact/dropdown';
import { COUNTRIES } from '@/constants/countries';

export const CountryForm = ({ initialValue, onSubmit }: { initialValue: Country, onSubmit: (country: Country) => void }) => {
  const [formValues, setFormValues] = useState(initialValue);

  useEffect(() => {
    setFormValues(initialValue);
  }, [initialValue]);

  const validationSchema = Yup.object({
    name: Yup.string()
      .max(255, 'The max length for the country name is 255 characters')
      .required('The country name is required'),
  });

  return (
    <Formik
      enableReinitialize
      initialValues={formValues}
      validationSchema={validationSchema}
      onSubmit={(country) => { onSubmit({ ...country, code: COUNTRIES.find((c) => c.name === country.name)?.code || '' }) }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <label htmlFor="name">Country Name</label>
            <Field name="name">
              {({ form }) => (
                <Dropdown
                  id="name"
                  value={form.values.name}
                  options={COUNTRIES.map((country) => ({ label: country.name, value: country.name }))}
                  filter
                  onChange={(e) => form.setFieldValue('name', e.value)}
                />
              )}
            </Field>
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

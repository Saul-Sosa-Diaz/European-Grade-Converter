/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the implementation of the CountryForm component.
 *
 * @date February 19, 2025
 * @description This file defines the CountryForm component used in the admin screen.
 * @author Saul Sosa
 */

import React, { useEffect, useState } from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Country } from '@/domain/country/country';
import { Dropdown } from 'primereact/dropdown';
import { COUNTRIES } from '@/constants/countries';
import { FormContainer, FormGroup } from './CountryForm.styles';
import { Button } from 'primereact/button';

interface CountryFormProps {
  initialValue: Country;
  onSubmit: (country: Country) => void;
}

export const CountryForm = ({ initialValue, onSubmit }: CountryFormProps) => {
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
      onSubmit={(country) => {
        onSubmit({
          ...country,
          code: COUNTRIES.find((c) => c.name === country.name)?.code || '',
        });
      }}
    >
      {({ isSubmitting }) => (
        <FormContainer>
          <FormGroup>
            <label htmlFor="name">Country Name</label>
            <Field name="name">
              {({ form }) => (
                <Dropdown
                  id="name"
                  value={form.values.name}
                  options={COUNTRIES.map((country) => ({
                    label: country.name,
                    value: country.name,
                  }))}
                  filter
                  onChange={(e) => form.setFieldValue('name', e.value)}
                  placeholder="Select a Country"
                />
              )}
            </Field>
            <ErrorMessage name="name" component="div" className="error" />
          </FormGroup>

          <Button type="submit" disabled={isSubmitting}>
            {formValues.id ? 'Update' : 'Create'}
          </Button>
        </FormContainer>
      )}
    </Formik>
  );
};

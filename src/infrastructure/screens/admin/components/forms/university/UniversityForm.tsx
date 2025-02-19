/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the implementation of the UniversityForm component.
 *
 * @date February 19, 2025
 * @description This file defines the UniversityForm component used in the admin screen.
 * @author Saul Sosa
 */

import React, { useEffect, useState } from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { University } from '@/domain/university/university';
import { Dropdown } from 'primereact/dropdown';
import { Country } from '@/domain/country/country';
import { FormContainer, FormGroup, StyledInput } from './UniversityForm.styles';
import { Button } from 'primereact/button';

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
        <FormContainer>
          <FormGroup>
            <label htmlFor="country">Country</label>
            <Field name="country">
              {({ form }) => (
                <Dropdown
                  id="country"
                  value={form.values.country}
                  options={countryList.map((country) => ({ label: country.name, value: country.name }))}
                  filter
                  onChange={(e) => form.setFieldValue('country', e.value)}
                  placeholder="Select a Country"
                  style={{ width: '100%' }}
                />
              )}
            </Field>
            <ErrorMessage name="country" component="div" className="error" />
          </FormGroup>

          <FormGroup>
            <label htmlFor="name">University Name</label>
            {/* Usamos el componente estilizado StyledInput */}
            <Field as={StyledInput} type="text" name="name" id="name" />
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


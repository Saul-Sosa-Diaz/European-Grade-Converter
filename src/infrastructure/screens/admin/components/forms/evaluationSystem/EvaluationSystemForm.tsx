/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the implementation of the EvaluationSystemForm component.
 *
 * @date February 19, 2025
 * @description This file defines the EvaluationSystemForm component used in the admin screen.
 * @author Saul Sosa
 */

import React, { useEffect, useState } from 'react';
import { Formik, Field } from 'formik';
import {
  GradeConversion,
  EvaluationSystem,
  EvaluationSystemWithGradeConversions,
  EvaluationType,
} from '@/domain/evaluationSystem/evaluationSystem';
import { University } from '@/domain/university/university';
import { useGetGradeConversionListByEvaluationID } from '@/hooks/evaluationSystem/useGetContinuousGradeConversion';
import { UniversityDropdown } from './UniversityDropdown';
import { GradeEquivalenceFields } from './GradeEquivalenceField';
import { ProgressSpinner } from 'primereact/progressspinner';
import { createInitialFormValues, getGradeConversions, getStep, handleSubmit } from './UtilsEvaluationSystemForm';
import { validationSchema } from './validationSchema';
import { FormContainer, FormGroup, Label, ErrorText } from './EvaluationSystemForm.styles';
import { Button } from 'primereact/button';
import { europeanGrades, InputType, NamesFormInput } from './ConstantsEvaluationSystemFom';

interface EvaluationSystemFormProps {
  initialValues: EvaluationSystem;
  onSubmit: (values: EvaluationSystemWithGradeConversions) => void;
  universityList: University[];
}

export const EvaluationSystemForm = ({
  initialValues,
  onSubmit,
  universityList,
}: EvaluationSystemFormProps) => {
  const {
    getGradeConversionListByEvaluationID: getGradeConversionListByEvaluationID,
    isFetched,
  } = useGetGradeConversionListByEvaluationID({
    evaluationSystemID: parseFloat(initialValues.evaluationSystemID),
  });

  const [gradeConversionFromBack, setGradeConversionFromBack] = useState<GradeConversion[]>(
    europeanGrades.map((grade) => ({
      gradeConversionID: '',
      evaluationSystemID: initialValues.evaluationSystemID,
      MinIntervalGrade: '',
      MaxIntervalGrade: '',
      gradeName: '',
      gradeValue: '',
      europeanEquivalence: grade,
      inputType: InputType.INTERVAL,
    }))
  );

  const formInitialValues = createInitialFormValues({ initialValues, gradeConversionFromBack });

  useEffect(() => {
    if (isFetched && getGradeConversionListByEvaluationID) {
      const conversions = getGradeConversions({ getGradeConversionListByEvaluationID });
      setGradeConversionFromBack(conversions);
    }

  }, [isFetched, getGradeConversionListByEvaluationID, initialValues.evaluationSystemID]);

  return (
    <Formik
      initialValues={formInitialValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={(updatedEvaluationSystem) => handleSubmit({ updatedEvaluationSystem, universityList, onSubmit })}
    >
      {({ values }) => (
        <FormContainer>
          <FormGroup>
            <Label htmlFor={NamesFormInput.UNIVERSITY_NAME}>University Name</Label>
            <UniversityDropdown name={NamesFormInput.UNIVERSITY_NAME} universityList={universityList} />
            <ErrorText name={NamesFormInput.UNIVERSITY_NAME} component="div" className="error" />
          </FormGroup>
          <FormGroup>
            <Label htmlFor={NamesFormInput.EVALUATION_SYSTEM_NAME}>Name of the system</Label>
            <Field id={NamesFormInput.EVALUATION_SYSTEM_NAME} name={NamesFormInput.EVALUATION_SYSTEM_NAME} />
            <ErrorText name={NamesFormInput.EVALUATION_SYSTEM_NAME} component="div" className="text-error" />
          </FormGroup>
          <FormGroup>
            <Label htmlFor={NamesFormInput.EVALUATION_TYPE}>Evaluation type</Label>
            <Field id={NamesFormInput.EVALUATION_TYPE} as="select" name={NamesFormInput.EVALUATION_TYPE}>
              {Object.values(EvaluationType).map((type) => (
                <option key={type} value={type}>
                  {type.toUpperCase()}
                </option>
              ))}
            </Field>
            <ErrorText name={NamesFormInput.EVALUATION_TYPE} component="div" className="text-error" />
            <>
              {values.evaluationType == EvaluationType.CONTINUOUS && (
                <>
                  <FormGroup>
                    <Label htmlFor={NamesFormInput.MIN_GRADE}>Minimum grade</Label>
                    <Field id={NamesFormInput.MIN_GRADE} type="number" name={NamesFormInput.MIN_GRADE} />
                    <ErrorText name={NamesFormInput.MIN_GRADE} component="div" className="text-error" />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor={NamesFormInput.MAX_GRADE}>Maximum grade</Label>
                    <Field id={NamesFormInput.MAX_GRADE} type="number" name={NamesFormInput.MAX_GRADE} />
                    <ErrorText name={NamesFormInput.MAX_GRADE} component="div" className="text-error" />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor={NamesFormInput.FIXED}>Number of decimals</Label>
                    <Field id={NamesFormInput.FIXED} type="number" name={NamesFormInput.FIXED} />
                    <ErrorText name={NamesFormInput.FIXED} component="div" className="text-error" />
                  </FormGroup>
                </>)}
            </>
            <FormGroup>
              <Label htmlFor={NamesFormInput.EVALUATION_SYSTEM_INFO}>Information about the evaluation System</Label>
              <Field id={NamesFormInput.EVALUATION_SYSTEM_INFO} type="text" as="textarea" name={NamesFormInput.EVALUATION_SYSTEM_INFO} />
              <ErrorText name={NamesFormInput.EVALUATION_SYSTEM_INFO} component="div" className="text-error" />
            </FormGroup>
            <FormGroup>
              <Label htmlFor={NamesFormInput.URL_TO_EVIDENCE}>URL to evidence</Label>
              <Field id={NamesFormInput.URL_TO_EVIDENCE} type="text" name={NamesFormInput.URL_TO_EVIDENCE} />
              <ErrorText name={NamesFormInput.URL_TO_EVIDENCE} component="div" className="text-error" />
            </FormGroup>
          </FormGroup>

          <FormGroup>
            <h3>European equivalences</h3>
            {!isFetched && values.evaluationSystemID ? <ProgressSpinner /> : (
              <GradeEquivalenceFields
                evaluationType={values.evaluationType}
                gradeEquivalence={values.gradeEquivalence}
                isUpdating={!!values.evaluationSystemID}
                europeanGrades={europeanGrades}
                fixed={values.fixed}
                getStep={getStep}
              />)}
          </FormGroup>
          <Button type="submit" id={values.evaluationSystemID ? 'Update' : 'Create'}>{values.evaluationSystemID ? 'Update' : 'Create'}</Button>
        </FormContainer>
      )}
    </Formik>
  );
}
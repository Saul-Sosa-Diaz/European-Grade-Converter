/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the unit tests for the EvaluationSystemForm component.
 *
 * @date February 19, 2025
 * @description This file defines the unit tests for the EvaluationSystemForm component used in the admin screen.
 * @author Saul Sosa
 */

import React from 'react';
import { render, fireEvent, waitFor } from '@/tests/app-test-utils';
import { EvaluationSystemForm } from './EvaluationSystemForm';
import { UNIVERSITY_LIST } from '@/infrastructure/fixture/university';
import { University } from '@/domain/university/university';
import { EVALUATION_SYSTEM_LIST, SPAIN_EVALUATION_SYSTEM_WITH_GRADE_CONVERSION } from '@/infrastructure/fixture/evaluationSystem';
import { getMaxGrade, getMinGrade } from './UtilsEvaluationSystemForm';


describe('EvaluationSystemForm', () => {
  const initialValues = EVALUATION_SYSTEM_LIST[0];
  const universityList: University[] = UNIVERSITY_LIST;
  const onSubmit = jest.fn();

  it('renders the form with initial values', () => {
    const screen = render(
      <EvaluationSystemForm
        initialValues={initialValues}
        onSubmit={onSubmit}
        universityList={universityList}
      />
    );

    expect(screen.getByLabelText(/University Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Name of the system/i)).toHaveValue(initialValues.evaluationSystemName);
    expect(screen.getByLabelText(/Evaluation type/i)).toHaveValue(initialValues.evaluationType);
    expect(screen.getByLabelText(/Minimum grade/i)).toHaveValue(getMinGrade(initialValues.validGrades));
    expect(screen.getByLabelText(/Maximum grade/i)).toHaveValue(getMaxGrade(initialValues.validGrades));
    expect(screen.getByLabelText(/Number of decimals/i)).toHaveValue(initialValues.fixed);
    expect(screen.getByLabelText(/Information about the evaluation System/i)).toHaveValue(initialValues.evaluationSystemInfo);
    expect(screen.getByLabelText(/URL to evidence/i)).toHaveValue(initialValues.URLToEvidence);
  });

  it('submits the form with updated values', async () => {
    const screen = render(
      <EvaluationSystemForm
        initialValues={initialValues}
        onSubmit={(onSubmit)}
        universityList={universityList}
      />
    );

    fireEvent.change(screen.getByLabelText(/Name of the system/i), { target: { value: 'Updated System' } });
    fireEvent.change(screen.getByLabelText(/Maximum grade/i), { target: { value: 15 } });
    fireEvent.change(screen.getByLabelText(/Number of decimals/i), { target: { value: 0 } });
    fireEvent.click(screen.getByRole('button', { name: /Update/i }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({
        ...SPAIN_EVALUATION_SYSTEM_WITH_GRADE_CONVERSION,
        evaluationSystemName: 'Updated System',
        fixed: 0,
        validGrades: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15']
      }
      ));
    });
  });

  it('displays validation errors', async () => {
    const screen = render(
      <EvaluationSystemForm
        initialValues={initialValues}
        onSubmit={onSubmit}
        universityList={universityList}
      />
    );
    expect(screen.queryByText(/Name of the system is required/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Minimum grade is required/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Maximum grade is required/i)).not.toBeInTheDocument();

  });


});
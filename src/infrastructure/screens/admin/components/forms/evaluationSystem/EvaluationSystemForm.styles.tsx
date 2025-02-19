/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the styled components for the EvaluationSystemForm component.
 *
 * @date February 19, 2025
 * @description This file defines the styled components used in the EvaluationSystemForm component.
 * @author Saul Sosa
 */

import { styled } from '@stitches/react';
import { ErrorMessage, Field, Form } from 'formik';

export const FormContainer = styled(Form, {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    width: '100%',
    minWidth: '600px',
    height: '100%',
    padding: '2rem',
});

export const FormGroup = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
});

export const Label = styled('label', {
    fontWeight: 'bold',
    fontSize: '0.9rem',
});

export const InputField = styled(Field, {
    padding: '0.75rem',
    borderRadius: '4px',
    border: '1px solid #ced4da',
    fontSize: '1rem',
    width: '100%',
    boxSizing: 'border-box',
    '&:focus': {
        borderColor: '#80bdff',
        outline: 'none',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)'
    },
    variants: {
        hasError: {
            true: {
                borderColor: '#dc3545',
                '&:focus': {
                    borderColor: '#dc3545',
                    boxShadow: '0 0 0 0.2rem rgba(220,53,69,.25)',
                },
            },
        },
    },

});



export const ErrorText = styled(ErrorMessage, {
    color: '#dc3545',
    fontSize: '0.875rem',
    marginTop: '0.25rem',
});


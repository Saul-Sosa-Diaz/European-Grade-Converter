/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the styled components for the UniversityForm component.
 *
 * @date February 19, 2025
 * @description This file defines the styled components used in the UniversityForm component.
 * @author Saul Sosa
 */

import { styled } from '@stitches/react';
import { Form } from 'formik';

export const FormContainer = styled(Form, {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    margin: '0 auto',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
});

export const FormGroup = styled('div', {
    marginBottom: '15px',

    '& label': {
        display: 'block',
        marginBottom: '5px',
        fontWeight: 'bold',
        fontSize: '0.9rem',
        color: '#333',
    },

    '& .error': {
        color: '#ff4d4f',
        fontSize: '0.8rem',
        marginTop: '5px',
    },
});

export const StyledInput = styled('input', { 
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '1rem',
    boxSizing: 'border-box', 
    '&:focus': {
        borderColor: '#007bff', 
        outline: 'none', 
        boxShadow: '0 0 0 2px rgba(0, 123, 255, 0.25)', 
    }
});
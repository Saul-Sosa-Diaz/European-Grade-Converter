/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the styled components for the CalculatedGradeComponent.
 *
 * @date February 19, 2025
 * @description This file defines the styled components used in the CalculatedGradeComponent.
 * @author Saul Sosa
 */

import { styled } from '@stitches/react';
import { Card } from 'primereact/card';

export const StyledCard = styled(Card, {
    '& .p-card': {
        padding: '0',
    },
    '& .p-card-body': {
        padding: '10',
    },
    '& .p-card-content': {
        padding: '0',
    },
    '& .p-card-footer': {
        padding: '0',
    },

});

export const GradeStyled = styled('p', {
    fontSize: '1.3rem',
    margin: '0',
    padding: '0',
    textAlign: 'center',
    fontWeight: 'bold',
});

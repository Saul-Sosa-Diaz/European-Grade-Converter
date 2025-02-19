/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the styled components for the AdminListHeader component.
 *
 * @date February 19, 2025
 * @description This file defines the styled components used in the AdminListHeader component.
 * @author Saul Sosa
 */

import { COLORS } from '@/constants/colors';
import { styled } from '@stitches/react';

export const StyledListHeader = styled('div', {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '0 20px',
    height: '80px',
    color: 'white',
    '& h1': {
        fontSize: '1.5rem',
        fontWeight: 'bold',
    },
    '& button': {
        height: '30px',
        width: '30px',
    },
    backgroundColor: COLORS.secondary,
});

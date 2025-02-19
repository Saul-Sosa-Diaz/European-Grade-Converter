/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the styled components for the ListDialog component.
 *
 * @date February 19, 2025
 * @description This file defines the styled components used in the ListDialog component.
 * @version 1.0.0
 * @author Saul Sosa
 */

import { COLORS } from '@/constants/colors';
import { styled } from '@stitches/react';
import { Dialog } from 'primereact/dialog';

export const StyledDialog = styled(Dialog, {
    '& .p-dialog-content': {
        padding: 0,
    },
    '& .p-dialog-header': {
        backgroundColor: COLORS.primary,
        color: 'white',
        padding: 12,
    },
    '& .p-dialog-header-close': {
        color: 'white',
    },
    '& .p-dialog-header-icons': {
        display: 'flex',
        alignSelf: 'center',
    }
});


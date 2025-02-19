/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the styled components for the Dashboard component.
 *
 * @date February 19, 2025
 * @description This file defines the styled components used in the Dashboard component.
 * @author Saul Sosa
 */

import { COLORS } from '@/constants/colors';
import { styled } from '@stitches/react';

export const DashboardContainer = styled('div', {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f4f4f4',
});

export const Card = styled('div', {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    width: '320px',
});

export const RoleBadge = styled('span', {
    backgroundColor: COLORS.primary,
    color: 'white',
    padding: '4px 10px',
    borderRadius: '8px',
    fontSize: '0.9em',
    fontWeight: 'bold',
});

export const LogoutButton = styled('button', {
    marginTop: '1.5rem',
    backgroundColor: '#ff4d4d',
    color: 'white',
    padding: '10px 16px',
    fontSize: '1em',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: '0.3s',
    '&:hover': {
        backgroundColor: '#cc0000',
    },
});
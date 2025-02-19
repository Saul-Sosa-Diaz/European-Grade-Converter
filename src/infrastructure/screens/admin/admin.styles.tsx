/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the styled components for the admin screen.
 *
 * @date February 19, 2025
 * @description This file defines the styled components used in the admin screen.
 * @author Saul Sosa
 */

import { COLORS } from '@/constants/colors';
import { styled } from '@stitches/react';

export const MainContainer = styled('div', {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    minHeight: '100vh',
});

export const SideBar = styled('div', {
    backgroundColor: '',
    margin: '0',
    color: 'black',
    borderRight: 'black 1px solid',
    width: '15%',
    fontSize: '1.2em',
    '& ul': {
        listStyle: 'none',
        margin: '0px',
        padding: '0px',
        '& li': {
            cursor: 'pointer',
            padding: '10px',
            transition: 'background 0.3s, color 0.3s',
            '&:hover': {
                backgroundColor: COLORS.primary,
                color: 'white',
            },
            '&.active': {
                backgroundColor: COLORS.secondary,
                color: 'white',
                fontWeight: 'bold',
            }
        },
    },
});

export const HeaderSideBar = styled('div', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80px',
    color: 'var(--primary-color-text)',
    backgroundColor: COLORS.primary,
});


export const MainContent = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
});

/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the styled components for the home screen.
 *
 * @date February 19, 2025
 * @description This file defines the styled components used in the home screen.
 * @author Saul Sosa
 */

import { styled } from '@/stitches.config'

export const HomeScreenMain = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    fontFamily: '"ArgentumSans", sans-serif',
    margin: '0px 00px 0px 0px',
})

export const ConversorContainer = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '24px',
    width: '80%',
    height: 'auto',
    marginTop: '50px',
    '@media (min-width: 768px)': {
        flexDirection: 'row',
    },
});

export const ArrowDown = styled('span', {
    display: 'block',
    '@media (min-width: 768px)': {
        display: 'none',
    },
});

export const ArrowRight = styled('span', {
    display: 'none',
    '@media (min-width: 768px)': {
        display: 'block',
    },
});

export const CountryAndGradeContainer = styled('div', {
    display: 'flex',
    flex: "1",
    flexDirection: 'column',
    gap: '24px',
    width: '100%',
    '@media (min-width: 768px)': {
        width: '20%',
    },
});

export const ContryAditionalInfoContainer = styled('div', {
    width: '80%',
    flex: '1',
});
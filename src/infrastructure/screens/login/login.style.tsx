/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the styled components for the login screen.
 *
 * @date February 19, 2025
 * @description This file defines the styled components used in the login screen.
 * @version 1.0.0
 * @author Saul Sosa
 */

import { COLORS } from '@/constants/colors'
import { styled } from '@/stitches.config'
import { Form } from 'formik'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Password } from 'primereact/password'

export const LoginContainer = styled('div', {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
})

export const StyledCard = styled(Card, {
    width: '20%',
    margin: 'auto',
    textAlign: 'center',

    '& .p-card-content': {
        padding: 0,
        paddingTop: 12,
    },
    '& .p-card-body': {
        padding: 0,
        paddingLeft: 12,
        paddingRight: 12,
    },
})

export const StyledForm = styled(Form, {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    gap: 12,
})

export const StyledPassword = styled(Password, {
    '& .p-icon-field': {
        width: '100%',
    },
    '& .p-password-input': {
        width: '100%',
    }

})

export const HeaderCard = styled('div', {
    backgroundColor: COLORS.primary,
    alignContent: 'center',
    color: 'white',
    textAlign: 'center',
    borderTopRightRadius: '10px',
    borderTopLeftRadius: '10px',
    borderBottom: `1px solid black`,
    height: '8rem',
    fontSize: '4rem',
    fontWeight: 'bold',
})

export const StyledButton = styled(Button, {
    width: '100%',
    backgroundColor: COLORS.secondary,
    color: 'white',
    '&:hover': {
        backgroundColor: COLORS.primary,
    },
    marginBottom: '12px',
})
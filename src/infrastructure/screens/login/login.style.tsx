import { COLORS } from '@/constants/colors'
import { styled } from '@/stitches.config'
import { Form } from 'formik'
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
    padding: '0',
    height: '50%',
    '& .p-card-content': {
    },
})

export const StyledForm = styled(Form, {
    display: 'flex',
    gap: '2rem',
    width: '100%',
    flexDirection: 'column',
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
    fontSize: '5rem',
})
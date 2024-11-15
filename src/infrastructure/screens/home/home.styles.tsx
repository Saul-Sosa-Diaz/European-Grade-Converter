import { styled } from '@/stitches.config'

export const HomeScreenMain = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
})

export const ConversorContainer = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '24px',
    width: '100vw',
    height: '40%', 
    '@media (min-width: 768px)': {
        flexDirection: 'row',
    },
});



export const CountryAndGradeContainer = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    width: '80%',
    '@media (min-width: 768px)': {
        width: '20%',
    },
});
import { styled } from '@/stitches.config'

export const HomeScreenMain = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
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
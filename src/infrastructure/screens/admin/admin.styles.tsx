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
            '&:hover': {
                backgroundColor: 'var(--primary-color)',
                borderRadius: '4px',
                fontSize: '1.4em',
                color: 'white',
            },
        },
    },
});

export const HeaderSideBar = styled('div', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--primary-color-text)',
    backgroundColor: COLORS.primary,
});


export const MainContent = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    padding: '16px',
});

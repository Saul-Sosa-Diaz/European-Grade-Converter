import { styled } from '@stitches/react';
import { Card } from 'primereact/card';

export const StyledCard = styled(Card, {
    '& .p-card': {
        padding: '0',
    },
    '& .p-card-body': {
        padding: '10',
    },
    '& .p-card-content': {
        padding: '0',
    },
    '& .p-card-footer': {
        padding: '0',
    }
});

export const GradeStyled = styled('p', {
    fontSize: '2.5vh',
    margin: '0',
    padding: '0',
    textAlign: 'center',
    fontWeight: 'bold',
});

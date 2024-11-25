import React from 'react';
import { Button } from 'primereact/button';
import { CardStyled, MessageContainer } from './custom403.styles';
import { signIn } from 'next-auth/react';

export const Custom403 = () => {
    return (
        <MessageContainer>
            <CardStyled>
                <h1>{"Ups... looks like you don't have access."}</h1>
                <Button onClick={() => signIn()}>Sign in</Button>
            </CardStyled>
        </MessageContainer>
    );
};
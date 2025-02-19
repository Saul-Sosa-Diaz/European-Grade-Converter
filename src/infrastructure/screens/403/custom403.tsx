/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the implementation of the custom 403 error screen.
 *
 * @date February 19, 2025
 * @description This file defines the custom 403 error screen component.
 * @author Saul Sosa
 */

import React from 'react';
import { Button } from 'primereact/button';
import { CardStyled, MessageContainer } from './custom403.styles';
import { signIn } from 'next-auth/react';

export const Custom403 = () => {
    return (
        <MessageContainer>
            <CardStyled>
                <h1>{"Ooops... looks like you don't have access."}</h1>
                <Button onClick={() => signIn()}>Sign in</Button>
            </CardStyled>
        </MessageContainer>
    );
};
/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the implementation of the custom 500 error screen.
 *
 * @date February 19, 2025
 * @description This file defines the custom 500 error screen component.
 * @author Saul Sosa
 */

'use client';
import React from 'react';
import { CardStyled, MessageContainer } from './custom500.styles';

export const Custom500 = () => {
    return (
        <MessageContainer>
            <CardStyled>
                <h1>{"Ups... looks like server crashed."}</h1>
                <h3>{"Contact with Saúl Sosa"}</h3>
                <a href='mailto:alu0101404141@ull.edu.es'>{"alu0101404141@ull.edu.es"}</a>
            </CardStyled>
        </MessageContainer>
    );
};
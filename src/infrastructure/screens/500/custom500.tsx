"use client";
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
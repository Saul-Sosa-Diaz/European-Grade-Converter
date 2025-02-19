/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the styled components for the custom 500 error screen.
 *
 * @date February 19, 2025
 * @description This file defines the styled components used in the custom 500 error screen.
 * @author Saul Sosa
 */

import { styled } from '@/stitches.config'
import { Card } from 'primereact/card'

export const MessageContainer = styled('div', {
    display: "flex",
    alignItems: "center",
    height: "100vh",
})

export const CardStyled = styled(Card, {
    margin: "auto",
    marginTop: "200px",
    width: "50%",
    textAlign: "center",
    verticalAlign: "middle",
});
/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the styled components for the GradeEquivalenceField component.
 *
 * @date February 19, 2025
 * @description This file defines the styled components used in the GradeEquivalenceField component.
 * @author Saul Sosa
 */

import { styled } from "@stitches/react";

export const EquivalenceContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

export const EquivalenceGroup = styled('div', {
  border: '1px solid #ddd',
  padding: '1rem',
  borderRadius: '4px',
  backgroundColor: '#f8f9fa',
});

export const EquivalenceHeader = styled('strong', {
  display: 'block',
  marginBottom: '0.5rem',
  fontSize: '1.1rem',
  color: '#333',
});

export const RadioGroup = styled('div', {
  display: 'flex',
  gap: '1rem',
  marginBottom: '0.5rem',
});

export const RadioLabel = styled('label', {
  display: 'flex',
  alignItems: 'center', 
  gap: '0.3rem',
  cursor: 'pointer',
});
/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the implementation for the NextAuthProvider component.
 * It uses the SessionProvider from next-auth to provide session management.
 *
 * @date February 18, 2025
 * @description This file has the implementation for the NextAuthProvider component.
 * @author Saul Sosa
 */
'use client';
import { SessionProvider } from "next-auth/react";

type Props = {
  children?: React.ReactNode;
};

export const NextAuthProvider = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};
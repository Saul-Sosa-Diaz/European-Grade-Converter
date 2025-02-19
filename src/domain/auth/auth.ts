/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the types and enums for authentication.
 * It defines the types for credentials, response messages, roles, and user information.
 *
 * @date February 18, 2025
 * @description This file has the types and enums for authentication.
 * @author Saul Sosa
 */

export type Credentials = {
  username: string
  password: string
}

export enum ResponseCredentials {
  INVALID_CREDENTIALS = 'Invalid credentials',
  MISSING_CREDENTIALS = 'Missing credentials',
}

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

export type User = {
  id: string
  name: string
  role: Role
}

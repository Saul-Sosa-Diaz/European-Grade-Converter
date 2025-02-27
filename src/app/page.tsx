/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the main page component.
 * It renders the home screen component.
 *
 * @date February 18, 2025
 * @description This file has the main page component.
 * @author Saul Sosa
 */
'use client';
import { Home as HomeScreen } from "@/infrastructure/screens/home";

export default function App() {

  return (
    <HomeScreen />
  );
}

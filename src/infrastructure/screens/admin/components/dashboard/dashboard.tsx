/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the implementation of the Dashboard component.
 *
 * @date February 19, 2025
 * @description This file defines the Dashboard component used in the admin screen.
 * @author Saul Sosa
 */
import { Role } from "@/domain/auth/auth";
import { signOut } from "next-auth/react";
import { Card, DashboardContainer, LogoutButton, RoleBadge } from "./dashboard.styles";

export const Dashboard = ({ userName, role }: { userName: string; role: Role }) => {
  return (
    <DashboardContainer>
      <Card>
        <h1>Welcome <span>{userName}</span></h1>
        <p>Your role is: <RoleBadge>{role}</RoleBadge></p>
        <LogoutButton onClick={() => signOut()}>Log Out</LogoutButton>
      </Card>
    </DashboardContainer>
  );
};
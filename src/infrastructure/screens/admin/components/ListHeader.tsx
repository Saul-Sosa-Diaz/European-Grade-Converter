/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the implementation of the AdminListHeader component.
 *
 * @date February 19, 2025
 * @description This file defines the AdminListHeader component used in the admin screen.
 * @author Saul Sosa
 */

import { Button } from "primereact/button";
import { StyledListHeader } from "./ListHeader.styles";

export const AdminListHeader = ({ listName, onClick }) => (
    <StyledListHeader>
        <h1>{listName}</h1>
        <Button icon="pi pi-plus" rounded severity="secondary" onClick={onClick} size="small" />
    </StyledListHeader>
)
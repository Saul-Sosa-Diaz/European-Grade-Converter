/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the implementation of the ListDialog component.
 *
 * @date February 19, 2025
 * @description This file defines the ListDialog component used in the admin screen.
 * @author Saul Sosa
 */

import { forwardRef } from "react";
import { StyledDialog } from "./ListDialog.styles";
import { Dialog } from "primereact/dialog";

interface ListDialogProps {
    visible: boolean;
    onHide: () => void;
    children: React.ReactNode;
    headerName: string;
}

const ListDialog = forwardRef<Dialog, ListDialogProps>((props, ref) => {
    const { visible, onHide, children, headerName } = props;

    return (
        <StyledDialog
            header={<p>{headerName}</p>}
            visible={visible}
            onHide={onHide}
            ref={ref}
        >
            {children}
        </StyledDialog>
    );
});

ListDialog.displayName = 'ListDialog';

export { ListDialog };
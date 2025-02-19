/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the implementation of the UniversityList component.
 *
 * @date February 19, 2025
 * @description This file defines the UniversityList component used in the admin screen.
 * @author Saul Sosa
 */

import React, { useState, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { University } from '@/domain/university/university';
import { Country } from '@/domain/country/country';
import { useUpdateUniversity } from '@/hooks/university/useUpdateUniversity';
import { useCreateUniversity } from '@/hooks/university/useCreateUniversity';
import { useDeleteUniversity } from '@/hooks/university/useDeleteUniversity';
import { AdminListHeader } from '../ListHeader';
import { ListDialog } from '../ListDialog';
import { UniversityForm } from '../forms/university/UniversityForm';
import { Dialog } from 'primereact/dialog';
import { displayNotification, setId } from '../utils';


interface UniversityListProps {
  universityList: University[];
  countryList: Country[];
}
export const UniversityList = ({ universityList, countryList }: UniversityListProps) => {
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);
  const [universityListState, setUniversityListState] = useState<University[]>(universityList);
  const [dialogVisibility, setDialogVisibility] = useState(false);
  const [maxId, setMaxId] = useState(Math.max(...universityListState.map((university) => parseInt(university.id))));
  const { updateUniversity } = useUpdateUniversity();
  const { createUniversity } = useCreateUniversity();
  const { deleteUniversity } = useDeleteUniversity();
  const dialogRef = useRef<Dialog>(null);
  const toastRef = useRef(null);

  const handleUpdate = async (updatedUniversity: University) => {
    try {
      await updateUniversity(updatedUniversity);
      setUniversityListState((prevList) =>
        prevList.map((university) => (university.id === updatedUniversity.id ? updatedUniversity : university))
      );
      displayNotification({ message: `University ${updatedUniversity.name} updated successfully`, status: "success", toastRef });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      displayNotification({ message: `Error updating university ${updatedUniversity.name}: ${errorMessage}`, status: "error", toastRef });
    }
    setSelectedUniversity(null);
    setDialogVisibility(false);
  };

  const handleCreate = async (newUniversity: University) => {
    try {
      await createUniversity(newUniversity);
      const frontEndId = setId(maxId);
      setMaxId(parseInt(frontEndId));
      newUniversity.id = frontEndId;
      setUniversityListState((prevList) => [...prevList, newUniversity]);
      displayNotification({ message: `University ${newUniversity.name} added successfully`, status: "success", toastRef });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      displayNotification({ message: `Error adding university ${newUniversity.name}: ${errorMessage}`, status: "error", toastRef });
    }
    setDialogVisibility(false);
  };

  const handleDelete = async (universityToDelete: University) => {
    try {
      await deleteUniversity(universityToDelete);
      setUniversityListState((prevList) => prevList.filter((university) => university.id !== universityToDelete.id));
      displayNotification({ message: `University deleted successfully`, status: "success", toastRef });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      displayNotification({ message: `Error deleting university: ${errorMessage}`, status: "error", toastRef });
    }
  };

  return (
    <>
      <Toast ref={toastRef} />
      <AdminListHeader listName={"Universities"} onClick={() => setDialogVisibility(true)} />
      <DataTable value={universityListState} showGridlines>
        <Column field="country" header="Country" ></Column>
        <Column field="name" header="Name"></Column>
        <Column header="Edit" body={(university) => (
          <Button icon="pi pi-pencil" rounded severity="secondary" onClick={() => {
            setSelectedUniversity(university);
            setDialogVisibility(true);
          }} />
        )} />
        <Column header="Delete" body={(university) => (
          <Button icon="pi pi-trash" rounded severity="danger" onClick={() => handleDelete(university)} />
        )} />
      </DataTable>
      <ListDialog
        ref={dialogRef}
        visible={dialogVisibility || !!selectedUniversity}
        headerName={selectedUniversity ? "Updating University" : "Creating University"}
        onHide={() => {
          setDialogVisibility(false);
          setSelectedUniversity(null);
        }}
      >
        {selectedUniversity ? (
          <UniversityForm initialValue={selectedUniversity} onSubmit={handleUpdate} countryList={countryList} />
        ) : (
          <UniversityForm initialValue={{ id: "", name: "", country: "", countryID: "" }} onSubmit={handleCreate} countryList={countryList} />
        )}
      </ListDialog>
    </>
  );
};
/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the implementation of the CountryList component.
 *
 * @date February 19, 2025
 * @description This file defines the CountryList component used in the admin screen.
 * @author Saul Sosa
 */

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Country } from '@/domain/country/country';
import { Button } from 'primereact/button';
import { CountryForm } from '../forms/country/CountryForm';
import { useRef, useState } from 'react';
import { useUpdateCountry } from '@/hooks/country/useUpdateCountry';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { useCreateCountry } from '@/hooks/country/useCreateCountry';
import { useDeleteCountry } from '@/hooks/country/useDeleteCountry';
import Image from 'next/image';
import { AdminListHeader } from '../ListHeader';
import { ListDialog } from '../ListDialog';
import { displayNotification, setId } from '../utils';


export const CountryList = ({ countryList }: { countryList: Country[] }) => {
  const { updateCountry } = useUpdateCountry();
  const { createCountry } = useCreateCountry();
  const { deleteCountry } = useDeleteCountry();
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [countryListState, setCountryListState] = useState<Country[]>(countryList);
  const [dialogVisibility, setDialogVisibility] = useState(false);
  const [maxId, setMaxId] = useState(Math.max(...countryListState.map((country) => parseInt(country.id))));
  const dialogRef = useRef<Dialog | null>(null);
  const toastRef = useRef(null);

  const handleUpdate = async (updatedCountry: Country) => {
    try {
      await updateCountry(updatedCountry);
      setCountryListState((prevList) =>
        prevList.map((country) => (country.id === updatedCountry.id ? updatedCountry : country))
      );
      displayNotification({ message: `Country ${updatedCountry.name} updated successfully`, status: "success", toastRef });
    } catch (error) {
      displayNotification({ message: `Error updating country ${updatedCountry.name}: ${error.message}`, status: "error", toastRef });
    }
    setSelectedCountry(null);
    setDialogVisibility(false);
  };

  const handleCreate = async (newCountry: Country) => {
    try {
      await createCountry(newCountry);
      const frontEndId = setId(maxId);
      setMaxId(parseInt(frontEndId));
      newCountry.id = frontEndId;
      setCountryListState((prevList) => [...prevList, newCountry]);
      displayNotification({ message: `Country ${newCountry.name} added successfully`, status: "success", toastRef });
    } catch (error) {
      displayNotification({ message: `Error adding country ${newCountry.name}: ${error.message}`, status: "error", toastRef });
    }
    setDialogVisibility(false);
  };

  const handleDelete = async (countryToDelete: Country) => {
    try {
      await deleteCountry(countryToDelete);
      setCountryListState((prevList) => prevList.filter((country) => country.id !== countryToDelete.id));
      displayNotification({ message: `Country deleted successfully`, status: "success", toastRef });
    } catch (error) {
      displayNotification({ message: `Error deleting country: ${error.message}`, status: "error", toastRef });
    }
  };



  return (
    <>
      <Toast ref={toastRef} />
      <AdminListHeader listName={"Countries"} onClick={() => setDialogVisibility(true)} />
      <DataTable value={countryListState} showGridlines>
        <Column field="code" header="Code"></Column>
        <Column header="Flag" body={(country: Country) => (
          <Image src={country.code ? `./flags/${country.code.toLowerCase()}.svg` : ""} alt={country.name} width={18} height={18} />
        )} />
        <Column field="name" header="Name"></Column>
        <Column header="Edit" body={(country) => (
          <Button icon="pi pi-pencil" rounded severity="secondary" onClick={() => {
            setSelectedCountry(country);
            setDialogVisibility(true);
          }} />
        )} />
        <Column header="Delete" body={(country) => (
          <Button icon="pi pi-trash" rounded severity="danger" onClick={() => handleDelete(country)} />
        )} />
      </DataTable>
      <ListDialog ref={dialogRef} visible={dialogVisibility || !!selectedCountry} headerName={selectedCountry ? "Updating Country" : "Creating Country"} onHide={() => {
        setDialogVisibility(false);
        setSelectedCountry(null);
      }}>
        {selectedCountry ? (
          <CountryForm initialValue={selectedCountry} onSubmit={handleUpdate} />
        ) : (
          <CountryForm initialValue={{ id: "", name: "", code: "" }} onSubmit={handleCreate} />
        )}
          </ListDialog >
    </>
  );
};
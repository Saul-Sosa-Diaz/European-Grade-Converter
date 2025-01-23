import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Country } from '@/domain/country/country';
import { Button } from 'primereact/button';
import { CountryForm } from '../../forms/country/CountryForm';
import { useRef, useState } from 'react';
import { useUpdateCountry } from '@/hooks/useUpdateCountry';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { useCreateCountry } from '@/hooks/useCreateCountry';
import { useDeleteCountry } from '@/hooks/useDeleteCountry';
import Image from 'next/image';


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
  // TODO: MODIFY TOAST TO GET A CORRECT MESSAGE WHEN ERROR
  const displayNotification = ({ message, status }: { message: string, status }) => {
    toastRef.current.show({ severity: status, detail: message, life: 3000 });
  };
  const setId = () => {
    const actualID = maxId + 1
    setMaxId(actualID);
    return actualID.toString();
  }

  const handleUpdate = async (updatedCountry: Country) => {
    try {
      updateCountry(updatedCountry);
      setCountryListState((prevList) =>
        prevList.map((country) => (country.id === updatedCountry.id ? updatedCountry : country))
      );
      displayNotification({ message: `Country ${updatedCountry.name} updated successfully`, status: "success" });
    } catch (error) {
      console.log(error);
      displayNotification({ message: `Error updating country ${updatedCountry.name}`, status: "error" });
    }
    setSelectedCountry(null);
    setDialogVisibility(false);
  };

  const handleCreate = async (newCountry: Country) => {
    try {
      await createCountry(newCountry);
      const frontEndId = setId();
      newCountry.id = frontEndId;
      setCountryListState((prevList) => [...prevList, newCountry]);
      displayNotification({ message: `Country ${newCountry.name} added successfully`, status: "success" });
    } catch (error) {
      displayNotification({ message: `Error adding country ${newCountry.name}: ${error.message}`, status: "error" });
    }
    setDialogVisibility(false);
  };

  const handleDelete = async (countryToDelete: Country) => {
    try {
      await deleteCountry(countryToDelete);
      setCountryListState((prevList) => prevList.filter((country) => country.id !== countryToDelete.id));
      displayNotification({ message: `Country deleted successfully`, status: "success" });
    } catch (error) {
      displayNotification({ message: `Error deleting country: ${error.message}`, status: "error" });
    }
  };

  return (
    <>
      <Toast ref={toastRef} />
      <Button icon="pi pi-plus" rounded severity="secondary" onClick={() => setDialogVisibility(true)} />
      <DataTable value={countryListState} stripedRows>
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

      <Dialog ref={dialogRef} visible={dialogVisibility || !!selectedCountry} onHide={() => {
        setDialogVisibility(false);
        setSelectedCountry(null);
      }}>
        {selectedCountry ? (
          <CountryForm initialValue={selectedCountry} onSubmit={handleUpdate} />
        ) : (
          <CountryForm initialValue={{ id: "", name: "", code: "" }} onSubmit={handleCreate} />
        )}
      </Dialog>
    </>
  );
};
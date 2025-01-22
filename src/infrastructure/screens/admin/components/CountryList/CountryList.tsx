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
  const dialogRef = useRef<Dialog | null>(null);
  const toastRef = useRef(null);
  // TODO: MODIFY TOAST TO GET A CORRECT MESSAGE WHEN ERROR
  const showSuccess = ({ message }: { message: string }) => {
    toastRef.current.show({ severity: 'success', summary: 'Success', detail: message, life: 3000 });
  };

  const handleUpdate = (updatedCountry: Country) => {
    updateCountry(updatedCountry);
    setCountryListState((prevList) =>
      prevList.map((country) =>
        country.id === updatedCountry.id ? updatedCountry : country
      )
    );
    showSuccess({ message: `Country ${updatedCountry.name} updated successfully` });
    setSelectedCountry(null);
    setDialogVisibility(false);
  };

  const handleCreate = (newCountry: Country) => {
    createCountry(newCountry);
    setCountryListState((prevList) => [...prevList, newCountry]);
    showSuccess({ message: `Country ${newCountry.name} added successfully` });
    setDialogVisibility(false);
  };
  const countryFlag = (country: Country) => {
    const src = country.code ? `./flags/${country.code.toLowerCase()}.svg` : null;
    const alt = country.name;
    return (
      <Image
        src={src}
        alt={alt}
        width={18}
        height={18}
      >
      </Image>
    )
  }

  const handleDelete = (countryToDelete: Country) => {
    setCountryListState((prevList) => prevList.filter(country => country.id !== countryToDelete.id));
    deleteCountry(countryToDelete);
    showSuccess({ message: `Country deleted successfully` });
  };
  // TODO: ADD HEADER TO THE DIALOG
  return (
    <>
      <Toast ref={toastRef} />
      <Button
        icon="pi pi-plus"
        rounded
        severity="secondary"
        onClick={() => {
          setDialogVisibility(true);
        }}
      />
      <DataTable value={countryListState} stripedRows>
        <Column field="code" header="Code"></Column>
        <Column header="Flag" body={countryFlag}></Column>
        <Column field="name" header="Name"></Column>
        <Column header="Edit" body={(country) => (
          <Button
            icon="pi pi-pencil"
            rounded
            severity="secondary"
            onClick={() => {
              setSelectedCountry(country);
              setDialogVisibility(true);
            }}
          />
        )}></Column>
        <Column header="Delete" body={(country) => (
          <Button
            icon="pi pi-trash"
            rounded
            severity="danger"
            onClick={() => handleDelete(country)}
          />
        )}></Column>
      </DataTable>

      <Dialog ref={dialogRef} visible={dialogVisibility || !!selectedCountry} onHide={() => {
        setDialogVisibility(false);
        setSelectedCountry(null);
      }}>
        {selectedCountry ? (
          <CountryForm
            initialValue={selectedCountry}
            onSubmit={handleUpdate}
          />
        ) : <CountryForm
          initialValue={{ id: '', name: '', code: '' }}
          onSubmit={handleCreate}
        />}
      </Dialog>
    </>
  );
};

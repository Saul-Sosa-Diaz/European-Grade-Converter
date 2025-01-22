import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Country } from '@/domain/country/country';
import { Button } from 'primereact/button';
import { CountryForm } from '../../forms/country/CountryForm';
import { useRef, useState } from 'react';
import { useUpdateCountry } from '@/hooks/useUpdateCountry';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';


export const CountryList = ({ countryList }: { countryList: Country[] }) => {
  const { updateCountry } = useUpdateCountry();
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [countryListState, setCountryListState] = useState<Country[]>(countryList);
  const [dialogVisibility, setDialogVisibility] = useState(false);
  const dialogRef = useRef<Dialog | null>(null);
  const toastRef = useRef(null);

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

  const handleAdd = (newCountry: Country) => {
    setCountryListState((prevList) => [...prevList, newCountry]);
    showSuccess({ message: `Country ${newCountry.name} added successfully` });
    setDialogVisibility(false);
  };

  const handleDelete = (countryId: number) => {
    setCountryListState((prevList) => prevList.filter(country => Number(country.id) !== countryId));
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
        <Column field="name" header="Name"></Column>
        <Column header="Edit" body={(rowData) => (
          <Button
            icon="pi pi-pencil"
            rounded
            severity="secondary"
            onClick={() => {
              setSelectedCountry(rowData);
              setDialogVisibility(true);
            }}
          />
        )}></Column>
        <Column header="Delete" body={(rowData) => (
          <Button
            icon="pi pi-trash"
            rounded
            severity="danger"
            onClick={() => handleDelete(rowData.id)}
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
          onSubmit={handleAdd}
        />}
      </Dialog>
    </>
  );
};

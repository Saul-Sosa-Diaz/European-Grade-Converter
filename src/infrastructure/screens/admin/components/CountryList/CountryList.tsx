import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Country } from '@/domain/country/country';
import { Button } from 'primereact/button';
import { OverlayPanel } from 'primereact/overlaypanel';
import { CountryForm } from '../../forms/country/CountryForm';
import { useRef, useState } from 'react';
import { useUpdateCountry } from '@/hooks/useUpdateCountry';
import { Toast } from 'primereact/toast';


export const CountryList = ({ countryList }: { countryList: Country[] }) => {
  const { updateCountry } = useUpdateCountry();
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [countryListState, setCountryListState] = useState<Country[]>(countryList);
  const overlayPanelRef = useRef<OverlayPanel | null>(null);
  const toastRef = useRef(null);

  const showSuccess = ({ message }: { message: string }) => {
    toastRef.current.show({ severity: 'success', summary: 'Success', detail: message, life: 3000 });
  }

  const header = <>List of Countries</>;

  const handleUpdate = (updatedCountry: Country) => {
    const message = `Country ${updatedCountry.name} updated successfully`;
    updateCountry(updatedCountry);
    setCountryListState((prevList) =>
      prevList.map((country) =>
        country.id === updatedCountry.id ? updatedCountry : country
      )
    );
    showSuccess({ message });
    setSelectedCountry(null); // Clear selected country after update
    overlayPanelRef.current?.hide(); // Close overlay panel
  };

  const editButton = (countryToEdit: Country) => {
    return (
      <>
        <Button
          icon="pi pi-pencil"
          rounded
          severity="secondary"
          onClick={(e) => {
            setSelectedCountry(countryToEdit);
            overlayPanelRef.current?.toggle(e);
          }}
        />
      </>
    );
  };

  return (
    <>
      <Toast ref={toastRef} />
      <DataTable value={countryListState} stripedRows header={header}>
        <Column field="code" header="Code"></Column>
        <Column field="name" header="Name"></Column>
        <Column header="Edit" body={editButton}></Column>
      </DataTable>

      <OverlayPanel ref={overlayPanelRef}>
        {selectedCountry && (
          <>
            <p>{selectedCountry.name}</p>
            <CountryForm
              initialValue={selectedCountry}
              onSubmit={handleUpdate}
            />
          </>
        )}
      </OverlayPanel>
    </>
  );
};

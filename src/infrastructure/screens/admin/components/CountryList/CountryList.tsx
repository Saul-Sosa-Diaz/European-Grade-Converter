import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Country } from '@/domain/country/country';
import { Button } from 'primereact/button';
import { OverlayPanel } from 'primereact/overlaypanel';
import { CountryForm } from '../../forms/country/CountryForm';
import { useRef } from 'react';


export const CountryList = ({ countryList }: { countryList: Country[] }) => {
  const header = (
    <>List of Countries</>
  );

  const overlayPanelRef = useRef(null);

  const editButton = (countryToEdit: Country) => {
    return (
      <>
        <Button icon="pi pi-pencil" rounded severity="secondary" aria-label="Bookmark" onClick={(e) => overlayPanelRef.current.toggle(e)} />
        <OverlayPanel ref={overlayPanelRef}>
          <CountryForm initialValue={countryToEdit} onSubmit={() => console.log("Created")} />
        </OverlayPanel>
      </>
    );
  }
  
  return (
    
    <DataTable value={countryList} stripedRows header={header}>
      <Column field="code" header="Code"></Column>
      <Column field="name" header="Name"></Column>
      <Column header="Edit" body={editButton}></Column>
    </DataTable>
  );
};

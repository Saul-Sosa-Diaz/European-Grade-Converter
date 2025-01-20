import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export const CountryList = ({ countries }) => {

  return (
    <DataTable value={countries} tableStyle={{ minWidth: '50rem' }}>
      <Column field="code" header="Code"></Column>
      <Column field="name" header="Name"></Column>
      <Column field="category" header="Category"></Column>
      <Column field="quantity" header="Quantity"></Column>
    </DataTable>
  );
};

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { CountryForm } from '../../forms/country/CountryForm';
import { useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import Image from 'next/image';


export const UniversityList = ({ universityList }: { universityList: University[] }) => { // TODO: MODIFY TO GET THE CORRECT TYPE

  const [selectedUniversity, setSelectedCountry] = useState<University | null>(null);
  const [universityListState, setUniversityListState] = useState<University[]>(universityList);
  const [dialogVisibility, setDialogVisibility] = useState(false);
  const [maxId, setMaxId] = useState(Math.max(...universityListState.map((country) => parseInt(country.id))));
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

  const handleUpdate = async (updatedUniversity: University) => {
    try {

      setUniversityListState((prevList) =>
        prevList.map((country) => (country.id === updatedUniversity.id ? updatedUniversity : country))
      );
      displayNotification({ message: `University ${updatedUniversity.name} updated successfully`, status: "success" });
    } catch (error) {
      displayNotification({ message: `Error updating country ${updatedUniversity.name}: ${error.message}`, status: "error" });
    }
    setSelectedCountry(null);
    setDialogVisibility(false);
  };

  const handleCreate = async (newUniversity: University) => {
    try {

      const frontEndId = setId();
      newUniversity.id = frontEndId;
      setUniversityListState((prevList) => [...prevList, newUniversity]);
      displayNotification({ message: `University ${newUniversity.name} added successfully`, status: "success" });
    } catch (error) {
      displayNotification({ message: `Error adding country ${newUniversity.name}: ${error.message}`, status: "error" });
    }
    setDialogVisibility(false);
  };

  const handleDelete = async (universityToDelete: University) => {
    try {

      setUniversityListState((prevList) => prevList.filter((country) => country.id !== universityToDelete.id));
      displayNotification({ message: `University deleted successfully`, status: "success" });
    } catch (error) {
      displayNotification({ message: `Error deleting country: ${error.message}`, status: "error" });
    }
  };

  return (
    <>
      <Toast ref={toastRef} />
      <Button icon="pi pi-plus" rounded severity="secondary" onClick={() => setDialogVisibility(true)} />
      <DataTable value={universityListState} stripedRows>
        <Column field="code" header="Code"></Column>
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

      <Dialog ref={dialogRef} visible={dialogVisibility || !!selectedUniversity} onHide={() => {
        setDialogVisibility(false);
        setSelectedCountry(null);
      }}>
        {selectedUniversity ? (
          <CountryForm initialValue={selectedUniversity} onSubmit={handleUpdate} />
        ) : (
          <CountryForm initialValue={{ id: "", name: "", code: "" }} onSubmit={handleCreate} />
        )}
      </Dialog>
    </>
  );
};
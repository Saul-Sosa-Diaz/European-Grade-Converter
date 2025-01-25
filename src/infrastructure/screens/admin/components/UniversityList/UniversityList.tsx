import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { University } from '@/domain/university/university';
import { UniversityForm } from '../../forms/university/UniversityForm';
import { Country } from '@/domain/country/country';
import { useUpdateUniversity } from '@/hooks/university/useUpdateUniversity';
import { useCreateUniversity } from '@/hooks/university/useCreateUniversity';
import { useDeleteUniversity } from '@/hooks/university/useDeleteUniversity';


export const UniversityList = ({ universityList, countryList }: { universityList: University[], countryList: Country[] }) => { // TODO: MODIFY TO GET THE CORRECT TYPE
  const [selectedUniversity, setSelectedCountry] = useState<University | null>(null);
  const [universityListState, setUniversityListState] = useState<University[]>(universityList);
  const [dialogVisibility, setDialogVisibility] = useState(false);
  const [maxId, setMaxId] = useState(Math.max(...universityListState.map((university) => parseInt(university.id))));
  const { updateUniversity } = useUpdateUniversity();
  const { createUniversity } = useCreateUniversity();
  const { deleteUniversity } = useDeleteUniversity();
  const dialogRef = useRef<Dialog | null>(null);
  const toastRef = useRef(null);

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
      await updateUniversity(updatedUniversity);
      setUniversityListState((prevList) =>
        prevList.map((university) => (university.id === updatedUniversity.id ? updatedUniversity : university))
      );
      displayNotification({ message: `University ${updatedUniversity.name} updated successfully`, status: "success" });
    } catch (error) {
      displayNotification({ message: `Error updating university ${updatedUniversity.name}: ${error.message}`, status: "error" });
    }
    setSelectedCountry(null);
    setDialogVisibility(false);
  };

  const handleCreate = async (newUniversity: University) => {
    try {
      await createUniversity(newUniversity);
      const frontEndId = setId();
      newUniversity.id = frontEndId;
      setUniversityListState((prevList) => [...prevList, newUniversity]);
      displayNotification({ message: `University ${newUniversity.name} added successfully`, status: "success" });
    } catch (error) {
      displayNotification({ message: `Error adding university ${newUniversity.name}: ${error.message}`, status: "error" });
    }
    setDialogVisibility(false);
  };

  const handleDelete = async (universityToDelete: University) => {
    try {
      await deleteUniversity(universityToDelete);
      setUniversityListState((prevList) => prevList.filter((university) => university.id !== universityToDelete.id));
      displayNotification({ message: `University deleted successfully`, status: "success" });
    } catch (error) {
      displayNotification({ message: `Error deleting university: ${error.message}`, status: "error" });
    }
  };

  return (
    <>
      <Toast ref={toastRef} />
      <Button icon="pi pi-plus" rounded severity="secondary" onClick={() => setDialogVisibility(true)} />
      <DataTable value={universityListState} stripedRows>
        <Column field="country" header="Country" ></Column>
        <Column field="name" header="Name"></Column>
        <Column header="Edit" body={(university) => (
          <Button icon="pi pi-pencil" rounded severity="secondary" onClick={() => {
            setSelectedCountry(university);
            setDialogVisibility(true);
          }} />
        )} />
        <Column header="Delete" body={(university) => (
          <Button icon="pi pi-trash" rounded severity="danger" onClick={() => handleDelete(university)} />
        )} />
      </DataTable>

      <Dialog ref={dialogRef} visible={dialogVisibility || !!selectedUniversity} onHide={() => {
        setDialogVisibility(false);
        setSelectedCountry(null);
      }}>
        {selectedUniversity ? (
          <UniversityForm initialValue={selectedUniversity} onSubmit={handleUpdate} countryList={countryList} />
        ) : (
          <UniversityForm initialValue={{ id: "", name: "", country: "", countryID: "" }} onSubmit={handleCreate} countryList={countryList} />
        )}
      </Dialog>
    </>
  );
};
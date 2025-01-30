import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { EvaluationSystem, EvaluationSystemWithGradeConversions } from '@/domain/evaluationSystem/evaluationSystem';
import { useUpdateEvaluationSystem } from '@/hooks/evaluationSystem/useUpdateEvaluationSystem';
import { useCreateEvaluationSystem } from '@/hooks/evaluationSystem/useCreateEvaluationSystem';
import { useDeleteEvaluationSystem } from '@/hooks/evaluationSystem/useDeleteEvaluationSystem';
import { EvaluationSystemForm } from '../forms/evaluationSystem/EvaluationSystemForm';
import { University } from '@/domain/university/university';


export const EvaluationSystemList = ({ evaluationSystemList, universityList }: { evaluationSystemList: EvaluationSystem[], universityList: University[] }) => {
  const [selectedEvaluationSystem, setSelectedCountry] = useState<EvaluationSystem | null>(null);
  const [evaluationSystemListState, setEvaluationSystemListState] = useState<EvaluationSystem[]>(evaluationSystemList);
  const [dialogVisibility, setDialogVisibility] = useState(false);
  const [maxId, setMaxId] = useState(Math.max(...evaluationSystemListState.map((evaluationSystem) => parseInt(evaluationSystem.evaluationSystemID))));
  const { updateEvaluationSystem } = useUpdateEvaluationSystem();
  const { createEvaluationSystem } = useCreateEvaluationSystem();
  const { deleteEvaluationSystem } = useDeleteEvaluationSystem();
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

  const handleUpdate = async (updatedEvaluationSystem: EvaluationSystemWithGradeConversions) => {
    try {
     console.log(updatedEvaluationSystem)
      setEvaluationSystemListState((prevList) =>
        prevList.map((evaluationSystem) => (evaluationSystem.evaluationSystemID === updatedEvaluationSystem.evaluationSystemID ? updatedEvaluationSystem : evaluationSystem))
      );
      displayNotification({ message: `EvaluationSystem ${updatedEvaluationSystem.evaluationSystemName} updated successfully`, status: "success" });
    } catch (error) {
      displayNotification({ message: `Error updating evaluationSystem ${updatedEvaluationSystem.evaluationSystemName}: ${error.message}`, status: "error" });
    }
    setSelectedCountry(null);
    setDialogVisibility(false);
  };

  const handleCreate = async (newEvaluationSystem: EvaluationSystemWithGradeConversions) => {
    try {
      await createEvaluationSystem(newEvaluationSystem);
      const frontEndId = setId();
      newEvaluationSystem.evaluationSystemID = frontEndId;
      setEvaluationSystemListState((prevList) => [...prevList, newEvaluationSystem]);
      displayNotification({ message: `EvaluationSystem ${newEvaluationSystem.evaluationSystemName} added successfully`, status: "success" });
    } catch (error) {
      displayNotification({ message: `Error adding evaluationSystem ${newEvaluationSystem.evaluationSystemName}: ${error.message}`, status: "error" });
    }
    setDialogVisibility(false);
  };

  const handleDelete = async (evaluationSystemToDelete: EvaluationSystem) => {
    try {
      await deleteEvaluationSystem(evaluationSystemToDelete);
      setEvaluationSystemListState((prevList) => prevList.filter((evaluationSystem) => evaluationSystem.evaluationSystemID !== evaluationSystemToDelete.evaluationSystemID));
      displayNotification({ message: `EvaluationSystem deleted successfully`, status: "success" });
    } catch (error) {
      displayNotification({ message: `Error deleting evaluationSystem: ${error.message}`, status: "error" });
    }
  };

  return (
    <>
      <Toast ref={toastRef} />
      <Button icon="pi pi-plus" rounded severity="secondary" onClick={() => setDialogVisibility(true)} />
      <DataTable value={evaluationSystemListState} stripedRows>
        <Column field="universityName" header="University Name" ></Column>
        <Column field="evaluationSystemName" header="Evaluation System Name" ></Column>
        <Column field="evaluationType" header="Type"></Column>
        <Column header="Edit" body={(evaluationSystem) => (
          <Button icon="pi pi-pencil" rounded severity="secondary" onClick={() => {
            setSelectedCountry(evaluationSystem);
            setDialogVisibility(true);
          }} />
        )} />
        <Column header="Delete" body={(evaluationSystem) => (
          <Button icon="pi pi-trash" rounded severity="danger" onClick={() => handleDelete(evaluationSystem)} />
        )} />
      </DataTable>

      <Dialog ref={dialogRef} visible={dialogVisibility || !!selectedEvaluationSystem} onHide={() => {
        setDialogVisibility(false);
        setSelectedCountry(null);
      }}>
        {selectedEvaluationSystem ? (
          <EvaluationSystemForm
            initialValues={selectedEvaluationSystem}
            onSubmit={handleUpdate}
            universityList={universityList}
          />
        ) : (
          <h1>a</h1>
        )}
      </Dialog>
    </>
  );
};
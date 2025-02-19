/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the implementation of the EvaluationSystemList component.
 *
 * @date February 19, 2025
 * @description This file defines the EvaluationSystemList component used in the admin screen.
 * @author Saul Sosa
 */

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { EvaluationSystem, EvaluationSystemWithGradeConversions, EvaluationType } from '@/domain/evaluationSystem/evaluationSystem';
import { useUpdateEvaluationSystem } from '@/hooks/evaluationSystem/useUpdateEvaluationSystem';
import { useCreateEvaluationSystem } from '@/hooks/evaluationSystem/useCreateEvaluationSystem';
import { useDeleteEvaluationSystem } from '@/hooks/evaluationSystem/useDeleteEvaluationSystem';
import { University } from '@/domain/university/university';
import { AdminListHeader } from '../ListHeader';
import { EvaluationSystemForm } from '../forms/evaluationSystem/EvaluationSystemForm';
import { ListDialog } from '../ListDialog';
import { displayNotification, setId } from '../utils';


export const EvaluationSystemList = ({ evaluationSystemList, universityList }: { evaluationSystemList: EvaluationSystem[], universityList: University[] }) => {
  const [selectedEvaluationSystem, setSelectedCountry] = useState<EvaluationSystem | null>(null);
  const [evaluationSystemListState, setEvaluationSystemListState] = useState<EvaluationSystem[]>(evaluationSystemList);
  const [dialogVisibility, setDialogVisibility] = useState(false);
  const [maxId, setMaxId] = useState(Math.max(...evaluationSystemListState.map((evaluationSystem) => parseFloat(evaluationSystem.evaluationSystemID))));
  const { updateEvaluationSystem } = useUpdateEvaluationSystem();
  const { createEvaluationSystem } = useCreateEvaluationSystem();
  const { deleteEvaluationSystem } = useDeleteEvaluationSystem();
  const dialogRef = useRef<Dialog | null>(null);
  const toastRef = useRef(null);

  const handleUpdate = async (updatedEvaluationSystem: EvaluationSystemWithGradeConversions) => {
    try {
      await updateEvaluationSystem(updatedEvaluationSystem);
      setEvaluationSystemListState((prevList) =>
        prevList.map((evaluationSystem) => (evaluationSystem.evaluationSystemID === updatedEvaluationSystem.evaluationSystemID ? updatedEvaluationSystem : evaluationSystem))
      );
      displayNotification({ message: `EvaluationSystem ${updatedEvaluationSystem.evaluationSystemName} updated successfully`, status: "success", toastRef });
    } catch (error) {
      displayNotification({ message: `Error updating evaluationSystem ${updatedEvaluationSystem.evaluationSystemName}: ${error.message}`, status: "error", toastRef });
    }
    setSelectedCountry(null);
    setDialogVisibility(false);
  };

  const handleCreate = async (newEvaluationSystem: EvaluationSystemWithGradeConversions) => {
    try {
      await createEvaluationSystem(newEvaluationSystem);
      const frontEndId = setId(maxId);
      setMaxId(parseFloat(frontEndId));
      newEvaluationSystem.evaluationSystemID = frontEndId;
      setEvaluationSystemListState((prevList) => [...prevList, newEvaluationSystem]);
      displayNotification({ message: `EvaluationSystem ${newEvaluationSystem.evaluationSystemName} added successfully`, status: "success", toastRef });
    } catch (error) {
      displayNotification({ message: `Error adding evaluationSystem ${newEvaluationSystem.evaluationSystemName}: ${error.message}`, status: "error", toastRef });
    }
    setDialogVisibility(false);
  };

  const handleDelete = async (evaluationSystemToDelete: EvaluationSystem) => {
    try {
      await deleteEvaluationSystem(evaluationSystemToDelete);
      setEvaluationSystemListState((prevList) => prevList.filter((evaluationSystem) => evaluationSystem.evaluationSystemID !== evaluationSystemToDelete.evaluationSystemID));
      displayNotification({ message: `EvaluationSystem deleted successfully`, status: "success", toastRef });
    } catch (error) {
      displayNotification({ message: `Error deleting evaluationSystem: ${error.message}`, status: "error", toastRef });
    }
  };

  return (
    <>
      <Toast ref={toastRef} />
      <AdminListHeader listName={"Evaluation Systems"} onClick={() => setDialogVisibility(true)} />
      <DataTable value={evaluationSystemListState} showGridlines>
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
      <ListDialog headerName={selectedEvaluationSystem ? "Updating a Evaluation System" : "Creating a Evaluation System"} ref={dialogRef} visible={dialogVisibility || !!selectedEvaluationSystem} onHide={() => {
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
          <EvaluationSystemForm
            initialValues={{ evaluationSystemID: null, evaluationSystemName: '', evaluationType: EvaluationType.CONTINUOUS, validGrades: [], fixed: 0, universityID: null, universityName: '', evaluationSystemInfo: '', URLToEvidence: '' }}
            onSubmit={handleCreate}
            universityList={universityList}
          />
        )}
      </ListDialog >
    </>
  );
};
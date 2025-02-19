/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the implementation of the UniversityDropdown component.
 *
 * @date February 19, 2025
 * @description This file defines the UniversityDropdown component used in the admin screen.
 * @author Saul Sosa
 */


import { University } from "@/domain/university/university";
import { Field } from "formik";
import { Dropdown } from "primereact/dropdown";

interface UniversityDropdownProps {
  name: string;
  universityList: University[];
}

export const UniversityDropdown = ({ name, universityList }: UniversityDropdownProps) => {
  return (<Field>
    {({ form }) => (
      <Dropdown
        inputId={name}
        value={form.values[name]}
        options={universityList.map((university) => ({
          label: university.name,
          value: university.name,
        }))}
        filter
        onChange={(e) => form.setFieldValue(name, e.value)}
      />
    )}
  </Field>)
}
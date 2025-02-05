import { University } from "@/domain/university/university";
import { Field } from "formik";
import { Dropdown } from "primereact/dropdown";

interface UniversityDropdownProps {
  name: string;
  universityList: University[];
}

export const UniversityDropdown = ({ name, universityList }: UniversityDropdownProps) => {
  return (<Field name={name}>
    {({ form }) => (
      <Dropdown
        id={name}
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
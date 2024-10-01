// @ts-nocheck
import React from "react";
import { ChevronDownIcon } from "primereact/icons/chevrondown";
import { ChevronRightIcon } from "primereact/icons/chevronright";
import { TreeSelect } from "primereact/treeselect";
import { Country } from "../lib/countries";

/**
 * Reusable TreeSelect component to handle common dropdown logic and rendering.
 */
interface CustomTreeSelectProps<T> {
  value: T | null | string;
  options: T[] | Country[];
  optionLabel: string;
  placeholder: string;
  onChange: (e: DropdownChangeEvent) => void;
  valueTemplate?: (option: any, props: any) => React.ReactNode;
  itemTemplate?: (option: T) => React.ReactNode;
  panelFooterTemplate?: () => React.ReactNode;
  dropdownClassName?: string;
  filter?: boolean;
}

/**
 * Generic TreeSelect component that can be reused for country or grade selection.
 */
const CustomTreeSelect = <T,>({
  value,
  options,
  optionLabel,
  placeholder,
  nodeTemplate,
  valueTemplate,
  onChange,
  panelFooterTemplate,
  dropdownClassName = "w-full vertical-align-middle",
  filter,
}: CustomDropdownProps<T>) => {
  return (
    <TreeSelect
      value={value}
      onChange={onChange}
      options={options}
      optionlabel={optionLabel}
      placeholder={placeholder}
      filter={filter ? true : false}
      className={dropdownClassName}
      nodeTemplate={nodeTemplate}
      valueTemplate={valueTemplate}
      panelFooterTemplate={panelFooterTemplate}
      dropdownIcon={(opts) =>
        opts.iconProps["data-pr-overlay-visible"] ? (
          <ChevronRightIcon {...opts.iconProps} />
        ) : (
          <ChevronDownIcon {...opts.iconProps} />
        )
      }
    />
  );
};

export default CustomTreeSelect;

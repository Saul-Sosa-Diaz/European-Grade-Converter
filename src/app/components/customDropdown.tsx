// @ts-nocheck
import React from 'react';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { ChevronDownIcon } from 'primereact/icons/chevrondown';
import { ChevronRightIcon } from 'primereact/icons/chevronright';

/**
 * Reusable dropdown component to handle common dropdown logic and rendering.
 */
interface CustomDropdownProps<T> {
    value: T | null;
    options: T[];
    optionLabel: string;
    placeholder: string;
    onChange: (e: DropdownChangeEvent) => void;
    valueTemplate?: (option: T, props: any) => React.ReactNode;
    itemTemplate?: (option: T) => React.ReactNode;
    panelFooterTemplate?: () => React.ReactNode;
    dropdownClassName?: string;
}

/**
 * Generic Dropdown component that can be reused for country or grade selection.
 */
const CustomDropdown = <T,>({ 
    value, 
    options, 
    optionLabel, 
    placeholder, 
    onChange, 
    valueTemplate, 
    itemTemplate, 
    panelFooterTemplate,
    dropdownClassName = "w-full md:w-14rem vertical-align-middle"
}: CustomDropdownProps<T>) => {
    return (
        <Dropdown
            value={value}
            onChange={onChange}
            options={options}
            optionLabel={optionLabel}
            placeholder={placeholder}
            valueTemplate={valueTemplate}
            itemTemplate={itemTemplate}
            className={dropdownClassName}
            panelFooterTemplate={panelFooterTemplate}
            dropdownIcon={(opts) =>
                opts.iconProps['data-pr-overlay-visible'] ? (
                    <ChevronRightIcon {...opts.iconProps} />
                ) : (
                    <ChevronDownIcon {...opts.iconProps} />
                )
            }
        />
    );
};

export default CustomDropdown;

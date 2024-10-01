import { Country } from '@/src/app/lib/countries';

/**
 * Template for rendering the selected country or grade in the dropdown.
 */
export const renderSelectedItemTemplate = (option: Country[] | string, props: any) => {
    
    if (option.length === 0) { 
        // If the option is null or undefined, display the placeholder text
        return <span>{props.placeholder}</span>;
    }
    
    if (typeof option === 'string') {
        return <span>{option[0]}</span>;
    }
    
    const src = option[0].code
      ? `./flags/${option[0].code.toLowerCase()}.svg`
      : null;
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <img
          src={src}
          style={{
            width: "18px",
            display: "inline-block",
            verticalAlign: "middle",
          }}
        />
        <span>{option[0].label}</span>
      </div>
    );
};

/**
 * Template for rendering each option in the dropdown list.
 */
export const renderOptionTemplate = (option: Country | string) => {
    if (typeof option === 'string') {
        return <span>{option}</span>;
    }
    console.log(option);
    const src = option.code ? `./flags/${option.code.toLowerCase()}.svg` : null;
    
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <img
          src={src}
          style={{
            width: "18px",
            display: "inline-block",
            verticalAlign: "middle",
          }}
        />
        <span>{option.label}</span>
      </div>
    );
};
/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @author Saul Sosa
 * @date October 20 2024
 *
 * @description This file contains the country templates used to render the selected item and options.
 */

import { CountryWithEvaluationInfo } from "@/domain/country/country";



/**
 * Template for rendering the selected country, this is used when the is country is already selected.
 * @param option - The selected country, this is an array for how prime react's TreeSelect works internally  .
 * @param props - The props passed to the component.
 * @returns The JSX element to render the selected item.
 */
export const renderSelectedItemTemplate = (option: CountryWithEvaluationInfo[], props: { placeholder: string }) => {
  if (option.length === 0) {
    // If the option is null or undefined, display the placeholder text
    return <span>{props.placeholder}</span>;
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
 * Template for rendering the selected country, this is used to show in treeselect.
 * @param option - The selected country.
 * @returns The JSX element to render the selected item.
 */
export const renderOptionTemplate = (option: CountryWithEvaluationInfo | string) => {
  if (typeof option === "string") {
    return <span>{option}</span>;
  }
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

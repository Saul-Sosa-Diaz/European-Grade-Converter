/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the implementation of the GradeEquivalenceField component.
 *
 * @date February 19, 2025
 * @description This file defines the GradeEquivalenceField component used in the admin screen.
 * @author Saul Sosa
 */

import { EuropeanEquivalence, EvaluationType } from "@/domain/evaluationSystem/evaluationSystem";
import { Field } from "formik";
import { ErrorText, FormGroup, InputField, Label } from "./EvaluationSystemForm.styles";
import { EquivalenceContainer, EquivalenceGroup, EquivalenceHeader, RadioGroup, RadioLabel } from "./GradeEquivalenceField.styles";
import { InputType } from "./ConstantsEvaluationSystemFom";

interface GradeEquivalenceInput {
  inputType: InputType;
  gradeValue: string;
  MinIntervalGrade?: number;
  MaxIntervalGrade?: number;
  gradeName: string;
  europeanEquivalence: EuropeanEquivalence;
}

interface GradeEquivalenceFieldsProps {
  evaluationType: EvaluationType;
  gradeEquivalence: GradeEquivalenceInput[];
  europeanGrades: EuropeanEquivalence[];
  fixed: number;
  isUpdating: boolean;
  getStep: (fixed: number) => number;
}

export const GradeEquivalenceFields = ({
  evaluationType,
  gradeEquivalence,
  fixed,
  isUpdating,
  getStep,
}: GradeEquivalenceFieldsProps) => {

  return (
    <EquivalenceContainer>
      {gradeEquivalence.map((entry, index) => (
        <EquivalenceGroup key={index}>
          <EquivalenceHeader>{gradeEquivalence[index].europeanEquivalence}</EquivalenceHeader>

          {evaluationType === EvaluationType.DISCRETE && (
            <FormGroup>
              <InputField name={`gradeEquivalence.${index}.gradeValue`} type="text" />
              <ErrorText name={`gradeEquivalence.${index}.gradeValue`} component="div" className="text-error" />
            </FormGroup>
          )}


          {!isUpdating && evaluationType !== EvaluationType.DISCRETE && (
            <RadioGroup>
              <RadioLabel>
                <Field
                  type="radio"
                  name={`gradeEquivalence.${index}.inputType`}
                  value={InputType.INTERVAL}
                />
                Interval
              </RadioLabel>
              <RadioLabel>
                <Field
                  type="radio"
                  name={`gradeEquivalence.${index}.inputType`}
                  value={InputType.DISCRETE}
                />
                Discrete value
              </RadioLabel>
            </RadioGroup>
          )}

          {entry && entry.inputType === InputType.INTERVAL && evaluationType !== EvaluationType.DISCRETE ? (
            <>
              <FormGroup>
                <Label>Bottom limit of the interval</Label>
                <InputField
                  name={`gradeEquivalence.${index}.MinIntervalGrade`}
                  onFocus={(e) => e.target.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })} // Prevents the user from using the mouse wheel to change the value
                  type="number"
                  step={getStep(fixed)}
                  hasError={false}
                />
                <ErrorText name={`gradeEquivalence.${index}.MinIntervalGrade`} component="div" className="text-error" />
              </FormGroup>
              <FormGroup>
                <Label>Top limit of the interval</Label>
                <InputField
                  name={`gradeEquivalence.${index}.MaxIntervalGrade`}
                  type="number"
                  onFocus={(e) => e.target.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })} // Prevents the user from using the mouse wheel to change the value
                  step={getStep(fixed)}
                  hasError={false}
                />
                <ErrorText name={`gradeEquivalence.${index}.MaxIntervalGrade`} component="div" className="text-error" />
              </FormGroup>
            </>
          ) : (
            evaluationType !== EvaluationType.DISCRETE && (
              <FormGroup>
                <Label>Discrete value</Label>
                <InputField name={`gradeEquivalence.${index}.gradeValue`} type="text" hasError={false} />
                <ErrorText name={`gradeEquivalence.${index}.gradeValue`} component="div" className="text-error" />
              </FormGroup>)
          )}
          {evaluationType !== EvaluationType.DISCRETE && (
            <FormGroup>
              <Label>Grade Name</Label>
              <InputField
                name={`gradeEquivalence.${index}.gradeName`}
                type="text"
                hasError={false}
              />
              <ErrorText name={`gradeEquivalence.${index}.gradeName`} component="div" className="text-error" />
            </FormGroup>
          )}
    
        </EquivalenceGroup>
      ))}
    </EquivalenceContainer>
  );
};
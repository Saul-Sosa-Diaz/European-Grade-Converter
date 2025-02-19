/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains utility functions used in the EvaluationSystemForm component.
 *
 * @date February 19, 2025
 * @description This file defines utility functions for the EvaluationSystemForm component used in the admin screen.
 * @author Saul Sosa
 */

import {
  EvaluationSystemWithGradeConversions,
  EvaluationType,
} from '@/domain/evaluationSystem/evaluationSystem'
import { generateGrades } from '../../../../../../../scripts/validGrades.mjs'
import { InputType } from './ConstantsEvaluationSystemFom'
import { University } from '@/domain/university/university'

/**
 * Retrieves the maximum valid grade from an array of grades.
 *
 * @param {string[]} validGrades - An array of grade values as strings.
 * @returns {number | string} - The maximum valid grade as a number, or the last element in the array if no valid grade is found.
 */
export const getMaxGrade = (validGrades) => {
  for (let i = validGrades.length - 1; i >= 0; i--) {
    const grade = parseFloat(validGrades[i])
    if (!isNaN(grade)) {
      return grade
    }
  }
  return validGrades[validGrades.length - 1]
}

/**
 * Retrieves the minimum valid grade from an array of grades.
 *
 * @param {string[]} validGrades - An array of grade strings.
 * @returns {number | string} The first valid numeric grade found in the array, or the first element of the array if no valid numeric grade is found.
 */
export const getMinGrade = (validGrades) => {
  for (let i = 0; i < validGrades.length; i++) {
    const grade = parseFloat(validGrades[i])
    if (!isNaN(grade)) {
      return grade
    }
  }
  return validGrades[0]
}

/**
 * Calculates the step value based on the given fixed decimal places.
 *
 * @param fixed - The number of decimal places to be considered.
 * @returns The step value as a number.
 */
export const getStep = (fixed: number) => 1 / Math.pow(10, fixed)

/**
 * Creates the initial form values for the evaluation system form.
 *
 * @param {Object} params - The parameters for creating initial form values.
 * @param {Object} params.initialValues - The initial values for the form.
 * @param {Object} params.gradeConversionFromBack - The grade conversion data from the backend.
 * @returns {Object} The initial form values.
 *
 * @remarks
 * If `gradeConversionFromBack` is not provided, the function returns `undefined`.
 * If the evaluation type is `DISCRETE`, the function sets the `gradeEquivalence` property.
 * Otherwise, it sets the `gradeEquivalence`, `maxGrade`, and `minGrade` properties.
 */
export function createInitialFormValues({ initialValues, gradeConversionFromBack }) {
  let formInitialValues
  if (!gradeConversionFromBack) {
    return formInitialValues
  }
  if (initialValues.evaluationType === EvaluationType.DISCRETE) {
    formInitialValues = {
      ...initialValues,
      gradeEquivalence: gradeConversionFromBack,
    }
  } else {
    formInitialValues = {
      ...initialValues,
      gradeEquivalence: gradeConversionFromBack,
      maxGrade: getMaxGrade(initialValues.validGrades),
      minGrade: getMinGrade(initialValues.validGrades),
    }
  }
  return formInitialValues
}

/**
 * Retrieves grade conversions and determines the input type for each conversion.
 *
 * @param {Object} params - The parameters object.
 * @param {Function} params.getGradeConversionListByEvaluationID - A function that returns a list of grade conversions by evaluation ID.
 * @returns {Array} An array of grade conversions with the determined input type.
 */
export function getGradeConversions({ getGradeConversionListByEvaluationID }) {
  return getGradeConversionListByEvaluationID.map((grade) => {
    const conversionFound = getGradeConversionListByEvaluationID.find(
      (gradeConversion) => gradeConversion.europeanEquivalence === grade.europeanEquivalence,
    )
    if (conversionFound) {
      let inputType: InputType = InputType.INTERVAL
      const hasInterval =
        (conversionFound.MinIntervalGrade !== null && conversionFound.MinIntervalGrade !== 0) ||
        (conversionFound.MaxIntervalGrade !== null && conversionFound.MaxIntervalGrade !== 0)
      const hasDiscrete = conversionFound.gradeValue && conversionFound.gradeValue.trim() !== ''
      if (hasDiscrete) {
        inputType = InputType.DISCRETE
      } else if (hasInterval) {
        inputType = InputType.INTERVAL
      }
      return { ...conversionFound, inputType }
    }
  })
}

/**
 * Handles the submission of the evaluation system form.
 *
 * @param {Object} params - The parameters for the handleSubmit function.
 * @param {Object} params.updatedEvaluationSystem - The updated evaluation system object.
 * @param {Array} params.universityList - The list of universities.
 * @param {Function} params.onSubmit - The callback function to be called on form submission.
 *
 * @returns {void}
 *
 * This function processes the updated evaluation system data and creates a list of valid grades based on the evaluation type.
 * It then constructs an updated values object containing the valid grades, evaluation system details, and grade conversions.
 * Finally, it calls the onSubmit callback with the updated values.
 */
export const handleSubmit = ({ updatedEvaluationSystem, universityList, onSubmit }) => {
  let validGrades = []
  // Create a list of valid grades
  if (updatedEvaluationSystem.evaluationType === EvaluationType.DISCRETE) {
    // If the evaluation type is discrete, the valid grades are the ones that are not empty
    for (const gradeEquivalence of updatedEvaluationSystem.gradeEquivalence) {
      if (gradeEquivalence.gradeValue && gradeEquivalence.gradeValue.trim() !== '') {
        validGrades.push(gradeEquivalence.gradeValue)
      }
    }
  } else {
    // If the evaluation type is continuous, the valid grades are the ones between the min and max grade
    validGrades = generateGrades(
      updatedEvaluationSystem.minGrade,
      updatedEvaluationSystem.maxGrade,
      getStep(updatedEvaluationSystem.fixed),
    )
    // If the evaluation type is continuous, the valid grades are the ones that are not empty
    for (const gradeEquivalence of updatedEvaluationSystem.gradeEquivalence) {
      if (gradeEquivalence.gradeValue && gradeEquivalence.gradeValue.trim() !== '') {
        validGrades.push(gradeEquivalence.gradeValue)
      }
    }
  }
  // Create the updated values
  const updatedValues: EvaluationSystemWithGradeConversions = {
    validGrades,
    evaluationSystemID: updatedEvaluationSystem.evaluationSystemID,
    evaluationSystemName: updatedEvaluationSystem.evaluationSystemName,
    evaluationType: updatedEvaluationSystem.evaluationType,
    fixed: updatedEvaluationSystem.fixed,
    evaluationSystemInfo: updatedEvaluationSystem.evaluationSystemInfo,
    URLToEvidence: updatedEvaluationSystem.URLToEvidence,
    universityID: universityList.find(
      (university: University) => university.name === updatedEvaluationSystem.universityName,
    )?.id,
    universityName: updatedEvaluationSystem.universityName,
    // Create the grade conversions
    gradeConversions: updatedEvaluationSystem.gradeEquivalence.map((interval) => {
      // If the evaluation type is discrete, the grade conversion is created with the grade value
      if (updatedEvaluationSystem.evaluationType === EvaluationType.DISCRETE) {
        return {
          gradeConversionID: interval.gradeConversionID,
          evaluationSystemID: interval.evaluationSystemID,
          europeanEquivalence: interval.europeanEquivalence,
          gradeName: interval.gradeName,
          MinIntervalGrade: null,
          MaxIntervalGrade: null,
          gradeValue: interval.gradeValue,
        }
      }
      // If the evaluation type is continuous, the grade conversion is created with the interval grades
      if (interval.inputType === InputType.INTERVAL) {
        return {
          gradeConversionID: interval.gradeConversionID,
          evaluationSystemID: interval.evaluationSystemID,
          europeanEquivalence: interval.europeanEquivalence,
          gradeName: interval.gradeName,
          MinIntervalGrade: interval.MinIntervalGrade,
          MaxIntervalGrade: interval.MaxIntervalGrade,
          gradeValue: null,
        }
      } else {
        // If the evaluation type is continuous, but the input type is discrete, the grade conversion is created with the grade value
        return {
          gradeConversionID: interval.gradeConversionID,
          evaluationSystemID: interval.evaluationSystemID,
          europeanEquivalence: interval.europeanEquivalence,
          gradeName: interval.gradeName,
          MinIntervalGrade: null,
          MaxIntervalGrade: null,
          gradeValue: interval.gradeValue,
        }
      }
    }),
  }
  onSubmit(updatedValues)
}

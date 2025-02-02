import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  GradeConversion,
  EvaluationSystem,
  EvaluationSystemWithGradeConversions,
  EvaluationType,
  EuropeanEquivalence,
} from '@/domain/evaluationSystem/evaluationSystem';
import { University } from '@/domain/university/university';
import { useGetGradeConversionListByEvaluationID } from '@/hooks/evaluationSystem/useGetContinuousGradeConversion';
import { UniversityDropdown } from './UniversityDropdown';
import { GradeEquivalenceFields } from './GradeEquivalenceField';
import { ProgressSpinner } from 'primereact/progressspinner';
import { generateGrades } from '../../../../../../../scripts/validGrades.mjs';
// import { generateGrades } from '...';

const validationSchema = Yup.object().shape({
  universityName: Yup.string().required('Required'),
  evaluationType: Yup.string().required('Required'),
  evaluationSystemName: Yup.string().required('Required'),
  minGrade: Yup.number().required('Required'),
  maxGrade: Yup.number().required('Required'),
  fixed: Yup.number().when('evaluationType', {
    is: (type) => type === EvaluationType.CONTINUOUS,
    then: (schema) => schema.required('Required').min(0).max(5),
    otherwise: (schema) => schema.notRequired(),
  }),
  gradeEquivalence: Yup.array().when('evaluationType', {
    is: (value: EvaluationType) => value === EvaluationType.CONTINUOUS,
    then: () =>
      Yup.array().of(
        Yup.object().shape({
          MinIntervalGrade: Yup.number()
            .nullable()
            .min(Yup.ref('$minGrade'), ({ min }) => `The value must be >= ${min}`)
            .test('min<=max', 'The min part has to be <= than the max part of the interval.', function (value) {
              if (value == null || this.parent.MaxIntervalGrade == null) return true;
              return value <= this.parent.MaxIntervalGrade;
            })
            .test('minRequiredIfMaxExists', 'MinIntervalGrade is required when MaxIntervalGrade is present', function (value) {
              if (this.parent.MaxIntervalGrade != null && value == null) return false;
              return true;
            }),

          MaxIntervalGrade: Yup.number()
            .nullable()
            .max(Yup.ref('$maxGrade'), ({ max }) => `The value must be <= ${max}`)
            .test('max>=min', 'Max must be >= Min', function (value) {
              if (value == null || this.parent.MinIntervalGrade == null) return true;
              return value >= this.parent.MinIntervalGrade;
            })
            .test('maxRequiredIfMinExists', 'MaxIntervalGrade is required when MinIntervalGrade is present', function (value) {
              if (this.parent.MinIntervalGrade != null && value == null) return false;
              return true;
            }),

          gradeName: Yup.string(),
        })
      ),
    otherwise: (schema) => schema.of(Yup.object().shape({ gradeValue: Yup.string() })),
  }),
});

export enum InputType {
  INTERVAL = 'interval',
  DISCRETE = 'discrete',
}

interface EvaluationSystemFormProps {
  initialValues: EvaluationSystem;
  onSubmit: (values: EvaluationSystemWithGradeConversions) => void;
  universityList: University[];
}

export const EvaluationSystemForm: React.FC<EvaluationSystemFormProps> = ({
  initialValues,
  onSubmit,
  universityList,
}) => {
  const {
    getContinouosGradeConversionListByEvaluationID: getGradeConversionListByEvaluationID,
    isFetched,
  } = useGetGradeConversionListByEvaluationID({
    evaluationSystemID: initialValues.evaluationSystemID,
  });

  const europeanGrades: EuropeanEquivalence[] = useMemo(
    () => [
      EuropeanEquivalence.F,
      EuropeanEquivalence.FX,
      EuropeanEquivalence.E,
      EuropeanEquivalence.D,
      EuropeanEquivalence.C,
      EuropeanEquivalence.B,
      EuropeanEquivalence.A,
    ],
    []
  );

  const [gradeConversionFromBack, setGradeConversionFromBack] = useState<GradeConversion[]>(
    europeanGrades.map((grade) => ({
      gradeConversionID: '',
      evaluationSystemID: initialValues.evaluationSystemID,
      MinIntervalGrade: 0,
      MaxIntervalGrade: 0,
      gradeName: '',
      gradeValue: '',
      europeanEquivalence: grade,
      inputType: InputType.INTERVAL,
    }))
  );
  const getMaxGrade = (validGrades) => {
    for (let i = validGrades.length - 1; i >= 0; i--) {
      const grade = parseFloat(validGrades[i]);
      if (!isNaN(grade)) {
        return grade;
      }
    }
    return parseFloat(validGrades[validGrades.length - 1]);
  }
  const getMinGrade = (validGrades) => {
    for (let i = 0; i < validGrades.length; i++) {
      const grade = parseFloat(validGrades[i]);
      if (!isNaN(grade)) {
        return grade;
      }
    }
    return parseFloat(validGrades[0]);
  }
  const formInitialValues = {
    ...initialValues,
    gradeEquivalence: gradeConversionFromBack,
    maxGrade: getMaxGrade(initialValues.validGrades),
    minGrade: getMinGrade(initialValues.validGrades),
  };

  useEffect(() => {
    if (isFetched && getGradeConversionListByEvaluationID) {

      const conversions = getGradeConversionListByEvaluationID.map((grade) => {
        const conversionFound = getGradeConversionListByEvaluationID.find(
          (gradeConversion) => gradeConversion.europeanEquivalence === grade.europeanEquivalence
        );
        if (conversionFound) {
          let inputType: InputType = InputType.INTERVAL;
          const hasInterval =
            (conversionFound.MinIntervalGrade !== null && conversionFound.MinIntervalGrade !== 0) ||
            (conversionFound.MaxIntervalGrade !== null && conversionFound.MaxIntervalGrade !== 0);
          const hasDiscrete = conversionFound.gradeValue && conversionFound.gradeValue.trim() !== '';
          if (hasDiscrete) {
            inputType = InputType.DISCRETE;
          } else if (hasInterval) {
            inputType = InputType.INTERVAL;
          }
          return { ...conversionFound, inputType };
        } 
      });
      setGradeConversionFromBack(conversions);
    }
  }, [isFetched, getGradeConversionListByEvaluationID, europeanGrades, initialValues.evaluationSystemID]);

  const getStep = useCallback((fixed: number) => 1 / Math.pow(10, fixed), []);

  const handleSubmit = (updatedEvaluationSystem) => {
    let validGrades = [];
    if (updatedEvaluationSystem.evaluationType === EvaluationType.DISCRETE) {
      for (const gradeEquivalence of updatedEvaluationSystem.gradeEquivalence) {
        if (gradeEquivalence.gradeValue && gradeEquivalence.gradeValue.trim() !== '') {
          validGrades.push(gradeEquivalence.gradeValue);
        }
      }
    } else {
      validGrades = generateGrades(updatedEvaluationSystem.minGrade, updatedEvaluationSystem.maxGrade, getStep(updatedEvaluationSystem.fixed));
      for (const gradeEquivalence of updatedEvaluationSystem.gradeEquivalence) {
        if (gradeEquivalence.gradeValue && gradeEquivalence.gradeValue.trim() !== '') {
          validGrades.push(gradeEquivalence.gradeValue);
        }
      }
    }
    const updatedValues: EvaluationSystemWithGradeConversions = {
      validGrades,
      evaluationSystemID: updatedEvaluationSystem.evaluationSystemID,
      evaluationSystemName: updatedEvaluationSystem.evaluationSystemName,
      evaluationType: updatedEvaluationSystem.evaluationType,
      fixed: updatedEvaluationSystem.fixed,
      universityID: universityList.find(
        (university) => university.name === updatedEvaluationSystem.universityName
      )?.id,
      universityName: updatedEvaluationSystem.universityName,
      gradeConversions: updatedEvaluationSystem.gradeEquivalence.map((interval, index) => {
        if (interval.inputType === InputType.INTERVAL) {
          return {
            gradeConversionID: interval.gradeConversionID,
            evaluationSystemID: interval.evaluationSystemID,
            europeanEquivalence: europeanGrades[index],
            gradeName: interval.gradeName,
            MinIntervalGrade: interval.MinIntervalGrade,
            MaxIntervalGrade: interval.MaxIntervalGrade,
            gradeValue: null,
          };
        } else {
          return {
            gradeConversionID: interval.gradeConversionID,
            evaluationSystemID: interval.evaluationSystemID,
            europeanEquivalence: europeanGrades[index],
            gradeName: interval.gradeName,
            MinIntervalGrade: null,
            MaxIntervalGrade: null,
            gradeValue: interval.gradeValue,
          };
        }
      }),
    }
    onSubmit(updatedValues);
  };

  return (
    <Formik
      initialValues={formInitialValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={handleSubmit}
    >
      {({ values }) => (
        <Form>
          <div>
            <label htmlFor="universityName">University Name</label>
            <UniversityDropdown name="universityName" universityList={universityList} />
            <ErrorMessage name="universityName" component="div" className="error" />
          </div>
          <div>
            <label>Name of the system</label>
            <Field name="evaluationSystemName" />
            <ErrorMessage name="evaluationSystemName" component="div" className="text-error" />
          </div>
          <div>
            <label>Evaluation type</label>
            <Field as="select" name="evaluationType">
              {Object.values(EvaluationType).map((type) => (
                <option key={type} value={type}>
                  {type.toUpperCase()}
                </option>
              ))}
            </Field>
            <ErrorMessage name="evaluationType" component="div" className="text-error" />
            <>
              {values.evaluationType == EvaluationType.CONTINUOUS && (
                <><div>
                  <label>Minimum grade</label>
                  <Field type="number" name="minGrade" />
                  <ErrorMessage name="minGrade" component="div" className="text-error" />
                </div>
                  <div>
                    <label>Maximum grade</label>
                    <Field type="number" name="maxGrade" />
                    <ErrorMessage name="maxGrade" component="div" className="text-error" />
                  </div>
                  <div>
                    <label>Number of decimals</label>
                    <Field type="number" name="fixed" />
                    <ErrorMessage name="fixed" component="div" className="text-error" />
                  </div></>)}
            </>
          </div>

          <div>
            <h3>European equivalences</h3>
            {!isFetched && values.evaluationSystemID ? <ProgressSpinner /> : (
              <GradeEquivalenceFields
                evaluationType={values.evaluationType}
                gradeEquivalence={values.gradeEquivalence}
                isUpdating={!!values.evaluationSystemID}
                europeanGrades={europeanGrades}
                fixed={values.fixed}
                getStep={getStep}
              />)}
          </div>
          <button type="submit">{values.evaluationSystemID ? 'Update' : 'Create'}</button>
        </Form>
      )}
    </Formik>
  );
};

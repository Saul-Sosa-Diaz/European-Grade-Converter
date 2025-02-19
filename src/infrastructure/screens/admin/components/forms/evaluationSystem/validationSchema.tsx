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

import { EvaluationType } from '@/domain/evaluationSystem/evaluationSystem';
import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
    universityName: Yup.string().required('Required'),
    evaluationType: Yup.string().required('Required'),
    evaluationSystemName: Yup.string().required('Required'),

    minGrade: Yup.number()
        .transform((value, originalValue) => (originalValue === '' ? undefined : value))
        .when('evaluationType', {
            is: (type) => type === EvaluationType.CONTINUOUS,
            then: (schema) => schema.required('Required'),
            otherwise: (schema) => schema.notRequired(),
        }),

    maxGrade: Yup.number()
        .transform((value, originalValue) => (originalValue === '' ? undefined : value))
        .when('evaluationType', {
            is: (type) => type === EvaluationType.CONTINUOUS,
            then: (schema) => schema.required('Required'),
            otherwise: (schema) => schema.notRequired(),
        }),

    fixed: Yup.number()
        .transform((value, originalValue) => (originalValue === '' ? undefined : value))
        .when('evaluationType', {
            is: (type) => type === EvaluationType.CONTINUOUS,
            then: (schema) => schema.required('Required').min(0).max(5),
            otherwise: (schema) => schema.notRequired(),
        }),

    evaluationSystemInfo: Yup.string().required('Required'),
    urlToEvidence: Yup.string().url('Invalid URL'),
    gradeEquivalence: Yup.array().when('evaluationType', {
        is: (value) => value === EvaluationType.CONTINUOUS,
        then: () => Yup.array().of(
            Yup.object().shape({
                MinIntervalGrade: Yup.number()
                    .transform((value, originalValue) => originalValue === '' ? undefined : value
                    )
                    .nullable()
                    .min(Yup.ref('$minGrade'), ({ min }) => `The value must be >= ${min}`)
                    .test(
                        'min<=max',
                        'The min part has to be <= than the max part of the interval.',
                        function (value) {
                            if (value == null || this.parent.MaxIntervalGrade == null) return true;
                            return value <= this.parent.MaxIntervalGrade;
                        }
                    )
                    .test(
                        'minRequiredIfMaxExists',
                        'MinIntervalGrade is required when MaxIntervalGrade is present',
                        function (value) {
                            if (this.parent.MaxIntervalGrade != null && value == null) return false;
                            return true;
                        }
                    ),

                MaxIntervalGrade: Yup.number()
                    .transform((value, originalValue) => originalValue === '' ? undefined : value
                    )
                    .nullable()
                    .max(Yup.ref('$maxGrade'), ({ max }) => `The value must be <= ${max}`)
                    .test('max>=min', 'Max must be >= Min', function (value) {
                        if (value == null || this.parent.MinIntervalGrade == null) return true;
                        return value >= this.parent.MinIntervalGrade;
                    })
                    .test(
                        'maxRequiredIfMinExists',
                        'MaxIntervalGrade is required when MinIntervalGrade is present',
                        function (value) {
                            if (this.parent.MinIntervalGrade != null && value == null) return false;
                            return true;
                        }
                    ),

                gradeName: Yup.string(),
            })
        ),
        otherwise: (schema) => schema.of(
            Yup.object().shape({
                gradeValue: Yup.string(),
            })
        ),
    }),
});

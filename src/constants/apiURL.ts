/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the API URL constants used throughout the application.
 * It defines the endpoints for country, university, evaluation system, and converter functionalities.
 *
 * @date February 18, 2025
 * @description This file has the API URL constants.
 * @author Saul Sosa
 */

export const API_URL = {
  country: {
    getCountryWithEvaluationInfoList: '/api/country/country-with-evaluation-info-list',
    getCountryList: '/api/country/country-list',
    updateCountry: '/api/country/update-country',
    createCountry: '/api/country/create-country',
    deleteCountry: '/api/country/delete-country',
  },
  university: {
    getUniversityList: '/api/university/university-list',
    updateUniversity: '/api/university/update-university',
    createUniversity: '/api/university/create-university',
    deleteUniversity: '/api/university/delete-university',
  },
  evaluationSystem: {
    getEvaluationSystemList: '/api/evaluation-system/evaluation-system-list',
    getGradeConversionListByEvaluationID:
      '/api/evaluation-system/grade-conversion-by-evaluation-system',
    updateEvaluationSystem: '/api/evaluation-system/update-evaluation-system',
    createEvaluationSystem: '/api/evaluation-system/create-evaluation-system',
    deleteEvaluationSystem: '/api/evaluation-system/delete-evaluation-system',
  },
  converter: {
    convertGrade: '/api/converter/convert-grade',
  },
}

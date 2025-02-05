import { useApi } from '@/context/ApiContext'
import {  EvaluationSystemWithGradeConversions } from '@/domain/evaluationSystem/evaluationSystem'
import { useMutation } from '@tanstack/react-query'

export const useUpdateEvaluationSystem = () => {
  const { EvaluationSystem } = useApi()

  const mutation = useMutation({
    mutationFn: async (evaluationSystem: EvaluationSystemWithGradeConversions) => {
      const response = await EvaluationSystem.updateEvaluationSystem(evaluationSystem)
      return response
    },
    onError: (error) => {
      console.error(error)
    },
  })

  return {
    updateEvaluationSystem: mutation.mutateAsync,
    ...mutation,
  }
}

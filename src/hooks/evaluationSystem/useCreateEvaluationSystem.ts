import { useApi } from '@/context/ApiContext'
import { EvaluationSystemWithGradeConversions } from '@/domain/evaluationSystem/evaluationSystem'
import { useMutation } from '@tanstack/react-query'

export const useCreateEvaluationSystem = () => {
  const { EvaluationSystem } = useApi()

  const mutation = useMutation({
    mutationFn: async (evaluationSystem: EvaluationSystemWithGradeConversions) => {
      const response = await EvaluationSystem.createEvaluationSystem(evaluationSystem)
      return response
    },
    onError: (error) => {
      console.error(error)
    },
  })

  return {
    createEvaluationSystem: mutation.mutateAsync,
    ...mutation,
  }
}

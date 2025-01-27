import { useApi } from '@/context/ApiContext'
import { EvaluationSystem } from '@/domain/evaluationSystem/evaluationSystem'
import { useMutation } from '@tanstack/react-query'

export const useUpdateEvaluationSystem = () => {
  const { EvaluationSystem } = useApi()

  const mutation = useMutation({
    mutationFn: async (evaluationSystem: EvaluationSystem) => {
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

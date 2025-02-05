import { useApi } from '@/context/ApiContext'
import { EvaluationSystem } from '@/domain/evaluationSystem/evaluationSystem'
import { useMutation } from '@tanstack/react-query'

export const useDeleteEvaluationSystem = () => {
  const { EvaluationSystem } = useApi()

  const mutation = useMutation({
    mutationFn: async (evaluationSystem: EvaluationSystem) => {
      const response = await EvaluationSystem.deleteEvaluationSystem(evaluationSystem)
      return response
    },
    onError: (error) => {
      console.error(error)
    },
  })

  return {
    deleteEvaluationSystem: mutation.mutateAsync,
    ...mutation,
  }
}

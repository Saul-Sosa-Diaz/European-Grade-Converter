import { useApi } from '@/context/ApiContext'
import { SignIn } from '@/domain/auth/authRepository'
import { useQuery } from '@tanstack/react-query'

export const useSignIn = (params: SignIn.Params) => {
  const { Auth } = useApi()

  const { data, isLoading } = useQuery({
    queryKey: ['SignIn'],
    queryFn: async () => await Auth.signIn(params),
  })

  return { user: data, isLoading }
}

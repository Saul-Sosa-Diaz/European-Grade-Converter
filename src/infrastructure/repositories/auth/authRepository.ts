import { AuthRepository } from '@/domain/auth/authRepository'
import { signIn } from 'next-auth/react'

export function createAuthRepository(): AuthRepository {
  return {
    signIn: async (params) => {
      await signIn('credentials', { ...params, callbackUrl: '/admin' })
    },
  }
}

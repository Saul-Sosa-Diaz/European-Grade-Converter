import { AuthRepository } from '@/domain/auth/authRepository'
import { credentialsFixture } from '@/infrastructure/fixture/auth/credentialsFixture'
import { signIn } from 'next-auth/react'

export function createAuthRepositoryFake(): AuthRepository {
  return {
    signIn: async (params) => {
      await signIn('credentials', { ...credentialsFixture , callbackUrl: '/admin' })
    }, 
  }
}

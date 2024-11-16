import { AuthRepository, SignIn } from "@/domain/auth/authRepository";

export function signIn(authRepository: AuthRepository): SignIn.Request {
  return async (params) => await authRepository.signIn(params)
}

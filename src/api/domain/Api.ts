import { AuthRepository } from '@/domain/auth/authRepository'
import { CountryRepository } from '@/domain/country/countryRepository'
import { EvalutationSystemRepository } from '@/domain/evaluationSystem/evaluationSystemRepository'
import { UniversityRepository } from '@/domain/university/universityRepository'

export interface Api {
  Country: CountryRepository
  University: UniversityRepository
  EvaluationSystem: EvalutationSystemRepository
  Auth: AuthRepository
}

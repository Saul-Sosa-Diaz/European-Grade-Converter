import { createApiFake } from './createApiFake'
import { createCountryRepository } from '../infrastructure/repositories/countryRepository'
import { getCountries } from '../application/getCountries'
import { Api } from './domain/Api'

export function createApi(): Api {
  if (process.env.DEBUG) return createApiFake()

  const countriesRepository = createCountryRepository()

  return {
    Countries: {
      getCountries: getCountries(countriesRepository),
    },
  }
}

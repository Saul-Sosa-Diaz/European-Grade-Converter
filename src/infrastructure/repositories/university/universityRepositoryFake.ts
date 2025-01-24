import { UniversityRepository } from "@/domain/university/universityRepository"


export function createUniversityRepositoryFake(): UniversityRepository {
  return {
    getUniversityList: async () => {
      return [ { name: 'University of Toronto', country: 'Canada', contryID: '1', id: "2" } ]
    },
    updateUniversity: async (country) => {
      // Use the country parameter
      console.log(country)
      return
    },
    createUniversity: async (country) => {
      console.log(country)
      return
    },
    deleteUniversity: async (country) => {
      console.log(country)
      return
    },
  }
}

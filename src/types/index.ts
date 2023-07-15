import { Listing, User } from '@prisma/client'

export type SafeUser = Omit<
  User,
  'createdAt' | 'updatedAt' | 'emailVerified'
> & {
  createdAt: string
  updatedAt: string
  emailVerified: string | null
}

export type CountrySelectValue = {
  flag: string
  label: string
  latlng: number[]
  region: string
  value: string
}

export type safeListing = Omit<Listing, 'createdAt'> & {
  createdAt: string
}

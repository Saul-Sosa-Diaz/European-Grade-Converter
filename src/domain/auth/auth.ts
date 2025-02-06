export type Credentials = {
  username: string
  password: string
}

export enum ResponseCredentials {
  INVALID_CREDENTIALS = 'Invalid credentials',
}

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

export type User = {
  id: string
  name: string
  apiKey: string
  role: Role
}

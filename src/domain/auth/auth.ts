export type Credentials = {
  userID: string
  username: string
  password: string
  apiKey: string
  roleName: Role
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
  roleName: string
}

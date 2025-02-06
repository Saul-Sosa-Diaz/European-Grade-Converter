export type Credentials = {
  userID: string
  username: string
  password: string
  apiKey: string
  roleName: string
}

export enum ResponseCredentials {
  INVALID_CREDENTIALS = 'Invalid credentials',
}

export type User = {
  id: string
  name: string
  apiKey: string
  roleName: string
}

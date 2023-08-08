import Auth from '@auth/core'

declare module '@auth/core' {
  export interface User {
    id: string
    name: string
    email: string
    username: string
    avatar_url: string
  }

}

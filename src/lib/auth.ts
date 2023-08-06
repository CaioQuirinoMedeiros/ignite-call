import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const googleScopeEmail = 'https://www.googleapis.com/auth/userinfo.email'
const googleScopeProfile = 'https://www.googleapis.com/auth/userinfo.profile'
const googleScopeCalendar =
  'https://www.googleapis.com/auth/admin.directory.resource.calendar'

export const authOptions: NextAuthOptions = {
  theme: {
    colorScheme: 'dark',
    brandColor: '#00875F',
    logo: '/next.svg',
    buttonText: '#FFFFFF'
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      authorization: {
        params: {
          scope: `${googleScopeEmail} ${googleScopeProfile} ${googleScopeCalendar}`
        }
      }
    })
  ],

  callbacks: {
    async signIn({ account }) {
      if (!account?.scope?.includes(googleScopeCalendar)) {
        return '/register/connect-calendar/?error=permission_not_granted'
      } else {
        return true
      }
    }
  }
}

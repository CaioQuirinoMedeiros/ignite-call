import type { NextAuthOptions } from 'next-auth'
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google'
import { PrismaAdapter } from './prisma-adapter'
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'

const googleScopeEmail = 'https://www.googleapis.com/auth/userinfo.email'
const googleScopeProfile = 'https://www.googleapis.com/auth/userinfo.profile'
const googleScopeCalendar = 'https://www.googleapis.com/auth/calendar'

export function createAuthOptions(
  cookies: ReadonlyRequestCookies
): NextAuthOptions {
  return {
    /** @ts-expect-error */
    adapter: PrismaAdapter(cookies),
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
            scope: `${googleScopeEmail} ${googleScopeProfile} ${googleScopeCalendar}`,
            prompt: 'consent',
            access_type: 'offline',
            response_type: 'code'
          }
        }
      })
    ],

    callbacks: {
      async session({ user, session }) {
        return { ...session, user: user }
      },
      async signIn({ account }) {
        if (!account?.scope?.includes(googleScopeCalendar)) {
          return '/register/connect-calendar/?error=permission_not_granted'
        } else {
          return true
        }
      }
    }
  }
}

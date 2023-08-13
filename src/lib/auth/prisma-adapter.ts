import { Adapter, AdapterUser, AdapterSession } from '@auth/core/adapters'
import { prisma } from '../prisma'
import { User as PrismaUser, Session as PrismaSession } from '@prisma/client'
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'
import { CookiesKeys } from '@/constants/cookies'

interface MyAdapterUser extends AdapterUser, PrismaUser {
  name: string
  email: string
}

interface MyAdapterSession extends AdapterSession, PrismaSession {}

function prismaUserToAdapterUser(prismaUser: PrismaUser): MyAdapterUser {
  return {
    id: prismaUser.id,
    email: prismaUser.email!,
    bio: prismaUser.bio,
    emailVerified: null,
    name: prismaUser.name,
    username: prismaUser.username,
    avatar_url: prismaUser.avatar_url,
    created_at: prismaUser.created_at,
    image: undefined
  }
}

function prismaSessionToAdapterSession(
  prismaSession: PrismaSession
): MyAdapterSession {
  return {
    id: prismaSession.id,
    expires: prismaSession.expires,
    session_token: prismaSession.session_token,
    sessionToken: prismaSession.session_token,
    user_id: prismaSession.user_id,
    userId: prismaSession.user_id
  }
}

export function PrismaAdapter(cookies: ReadonlyRequestCookies): Adapter {
  return {
    async createUser(user) {
      const userIdCookie = cookies.get(CookiesKeys.userId)

      if (!userIdCookie?.value) {
        throw new Error('User ID not found on cookies.')
      }

      const prismaUser = await prisma.user.update({
        where: {
          id: userIdCookie.value
        },
        data: {
          name: user.name ?? '',
          email: user.email,
          avatar_url: user.image
        }
      })

      cookies.delete(CookiesKeys.userId)

      return prismaUserToAdapterUser(prismaUser)
    },

    async getUser(id) {
      const user = await prisma.user.findUnique({ where: { id: id } })

      if (!user) return null

      return prismaUserToAdapterUser(user)
    },

    async getUserByEmail(email) {
      const user = await prisma.user.findUnique({
        where: { email: email }
      })

      if (!user) return null

      return prismaUserToAdapterUser(user)
    },

    async getUserByAccount({ providerAccountId, provider }) {
      const account = await prisma.account.findUnique({
        where: {
          provider_provider_account_id: {
            provider: provider,
            provider_account_id: providerAccountId
          }
        },
        include: {
          user: true
        }
      })

      if (!account) {
        return null
      }

      return prismaUserToAdapterUser(account.user)
    },

    async updateUser(user: MyAdapterUser) {
      const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: {
          name: user.name,
          email: user.email,
          avatar_url: user.avatar_url
        }
      })

      return prismaUserToAdapterUser(updatedUser)
    },

    async deleteUser(userId) {
      await prisma.user.delete({ where: { id: userId } })
    },

    async linkAccount(account) {
      await prisma.account.create({
        data: {
          provider: account.provider,
          provider_account_id: account.providerAccountId,
          type: account.type,
          access_token: account.access_token,
          expires_at: account.expires_at,
          id_token: account.id_token,
          refresh_token: account.refresh_token,
          scope: account.scope,
          token_type: account.token_type,
          user_id: account.userId
        }
      })
    },

    async unlinkAccount({ providerAccountId, provider }) {
      await prisma.account.delete({
        where: {
          provider_provider_account_id: {
            provider: provider,
            provider_account_id: providerAccountId
          }
        }
      })
    },

    async createSession({ sessionToken, userId, expires }) {
      await prisma.session.create({
        data: {
          user_id: userId,
          expires: expires,
          session_token: sessionToken
        }
      })

      return { sessionToken, userId, expires }
    },

    async getSessionAndUser(sessionToken) {
      const session = await prisma.session.findUnique({
        where: {
          session_token: sessionToken
        },
        include: {
          user: true
        }
      })

      if (!session) {
        return null
      }

      return {
        session: prismaSessionToAdapterSession(session),
        user: prismaUserToAdapterUser(session.user)
      }
    },

    async updateSession({ sessionToken, expires, userId }) {
      const session = await prisma.session.update({
        where: { session_token: sessionToken },
        data: {
          expires: expires,
          user_id: userId
        }
      })

      return prismaSessionToAdapterSession(session)
    },

    async deleteSession(sessionToken) {
      await prisma.session.delete({ where: { session_token: sessionToken } })
    }
  }
}

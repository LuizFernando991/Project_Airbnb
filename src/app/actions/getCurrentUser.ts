import { getServerSession } from 'next-auth'

import { authOptions } from '@/pages/api/auth/[...nextauth]'

import prisma from '../../libs/prismadb'
import { User } from '@prisma/client'

export async function getSession() {
  return await getServerSession(authOptions)
}

export default async function getCurrentUser(): Promise<User | null > {
  try {
    const session = await getSession()

    if(!session?.user?.email) {
      return null
    }

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email},
    })

    if(!currentUser) {
      return null
    }

    return {
      ...currentUser,
      hashedPassword: null
    }
    
  } catch (err: any) {
    return null
  }
}
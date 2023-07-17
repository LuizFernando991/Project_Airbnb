import { NextResponse } from 'next/server'

import getCurrentUser from '@/actions/getCurrentUser'
import prisma from '@/libs/prismadb'

interface IParams {
  listingId?: string
}

export async function POST(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  const { listingId } = params

  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid ID')
  }

  if (currentUser.favoriteIds.includes(listingId)) {
    return NextResponse.error()
  }

  try {
    const newUser = await prisma.user.update({
      where: { id: currentUser.id },
      data: { favoriteIds: { push: listingId } },
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
        image: true,
        createdAt: true,
        updatedAt: true,
        favoriteIds: true,
        accounts: true,
        listings: true,
        reservations: true,
      },
    })

    return NextResponse.json(newUser)
  } catch (error) {
    return NextResponse.error()
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams },
) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  const { listingId } = params

  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid ID')
  }

  try {
    const newUser = await prisma.user.update({
      where: { id: currentUser.id },
      data: {
        favoriteIds: {
          set: currentUser.favoriteIds.filter((id) => id !== listingId),
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
        image: true,
        createdAt: true,
        updatedAt: true,
        favoriteIds: true,
        accounts: true,
        listings: true,
        reservations: true,
      },
    })

    return NextResponse.json(newUser)
  } catch (error) {
    return NextResponse.error()
  }
}

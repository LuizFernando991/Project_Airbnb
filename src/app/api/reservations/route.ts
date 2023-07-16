import { NextResponse } from 'next/server'

import prisma from '@/libs/prismadb'
import getCurrentUser from '@/actions/getCurrentUser'
import { differenceInCalendarDays } from 'date-fns'

export async function POST(request: Request) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  const { listingId, startDate, endDate } = await request.json()

  if (!listingId || !startDate || !endDate) {
    return NextResponse.error()
  }

  const listing = await prisma.listing.findUnique({
    where: {
      id: listingId,
    },
  })

  if (!listing) {
    return NextResponse.error()
  }

  const dayCount = differenceInCalendarDays(endDate, startDate)

  const totalPrice = dayCount ? dayCount * listing.price : listing.price

  const listingAndReservation = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      reservations: {
        create: {
          userId: currentUser.id,
          startDate,
          endDate,
          totalPrice,
        },
      },
    },
  })

  return NextResponse.json(listingAndReservation)
}

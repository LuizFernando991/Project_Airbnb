import prisma from '@/libs/prismadb'

interface IParams {
  listingId?: string
  userId?: string
  authorId?: string
}

export default async function getReservations(params: IParams) {
  const { listingId, userId, authorId } = params

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const query: any = {}

  if (listingId) {
    query.listingId = listingId
  }

  if (userId) {
    query.listingId = userId
  }

  if (authorId) {
    query.listing = { userId: authorId }
  }

  try {
    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        Listing: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    const safeReservations = reservations.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toDateString(),
      endDate: reservation.endDate.toISOString(),
      Listing: {
        ...reservation.Listing,
        createdAt: reservation.Listing.createdAt.toISOString(),
      },
    }))

    return safeReservations
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error)
  }
}

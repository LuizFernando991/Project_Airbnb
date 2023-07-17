import prisma from '@/libs/prismadb'

export interface IListingsParams {
  userId?: string
}

export default async function getListings(params: IListingsParams) {
  const { userId } = params

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const query: any = {}

  if (userId) {
    query.userId = userId
  }

  try {
    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc',
      },
      take: 50,
    })
    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }))
    return safeListings
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    throw new Error(err)
  }
}

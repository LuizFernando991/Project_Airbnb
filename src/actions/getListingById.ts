import prisma from '@/libs/prismadb'

interface IParams {
  listingId?: string
}

export default async function getListingById(params: IParams) {
  try {
    const { listingId } = params

    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true,
      },
    })

    if (!listing) {
      return null
    }

    return {
      ...listing,
      createdAt: listing.createdAt.toString(),
      user: {
        ...listing.user,
        emailVerified: listing.user.emailVerified?.toString() || null,
        createdAt: listing.createdAt.toString(),
        updatedAt: listing.updatedAt.toString(),
      },
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error)
  }
}

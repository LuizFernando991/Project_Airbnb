import getCurrentUser from '@/actions/getCurrentUser'
import getListingById from '@/actions/getListingById'

import EmptyState from '@/components/EmptyState'
import ListingClient from './ListingClient'
import getReservations from '@/actions/getReservations'

export interface IParams {
  listingId?: string
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params)
  const currentUser = await getCurrentUser()
  const reservations = await getReservations(params)

  if (!listing) {
    return <EmptyState />
  }

  return (
    <ListingClient
      listing={listing}
      currentUser={currentUser}
      reservations={reservations}
    />
  )
}

export default ListingPage

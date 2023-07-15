'use client'

import Container from '@/components/Container'
import ListingHead from '@/components/listings/ListingHead'
import ListingInfo from '@/components/listings/ListingInfo'
import { categories } from '@/helpers/categorieslist'
import { SafeUser, safeListing } from '@/types'
import { Reservation } from '@prisma/client'
import { useMemo } from 'react'

interface IListingClientProps {
  reservations?: Reservation[]
  listing: safeListing & {
    user: SafeUser
  }
  currentUser?: SafeUser | null
}

const ListingClient: React.FC<IListingClientProps> = ({
  listing,
  currentUser,
}) => {
  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category)
  }, [listing])

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
          <ListingInfo
            user={currentUser}
            category={category}
            description={listing.description}
            roomCount={listing.roomCount}
            guestCount={listing.roomCount}
            bathroomCount={listing.bathroomCount}
            locationValue={listing.locationValue}
          />
        </div>
      </div>
    </Container>
  )
}

export default ListingClient

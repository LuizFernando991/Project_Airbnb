'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Container from '@/components/Container'
import Heading from '@/components/Heading'
import ListingCard from '@/components/listings/ListingCard'
import toast from 'react-hot-toast'
import { SafeUser, safeReservation } from '@/types'

interface IReservationsClientProps {
  currentUser?: SafeUser | null
  reservations: safeReservation[]
}

const ReservationsClient: React.FC<IReservationsClientProps> = ({
  currentUser,
  reservations,
}) => {
  const [deletingId, setDeletingId] = useState('')
  const router = useRouter()

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id)

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success('Reservation cancelled')
          router.refresh()
        })
        .catch(() => {
          toast.error('Something went wrong.')
        })
        .finally(() => {
          setDeletingId('')
        })
    },
    [router],
  )

  return (
    <Container>
      <Heading title="Reservations" subtitle="Bookings on your properties" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl: grid-cols-6 gap-8">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.Listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel guest reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  )
}

export default ReservationsClient

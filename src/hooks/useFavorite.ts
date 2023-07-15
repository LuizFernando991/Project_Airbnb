import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo } from 'react'
import { toast } from 'react-hot-toast'

import { SafeUser } from '@/types'

import useLoginModal from './useLoginModal'

interface IUseFavorite {
  listingId: string
  currentUser?: SafeUser | null
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter()
  const loginModal = useLoginModal()

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || []

    return list.includes(listingId)
  }, [currentUser, listingId])

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()
      if (!currentUser) {
        return loginModal.onOpen()
      }

      try {
        if (hasFavorited) {
          await axios.delete(`/api/favorites/${listingId}`)
        } else {
          await axios.post(`/api/favorites/${listingId}`)
        }

        router.refresh()
        toast.success(
          hasFavorited ? 'Removed from favorites.' : 'Add to favorites.',
        )
      } catch (error) {
        toast.error('Something went wrong.')
      }
    },
    [currentUser, hasFavorited, listingId, loginModal, router],
  )

  return { hasFavorited, toggleFavorite }
}

export default useFavorite
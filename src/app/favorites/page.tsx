import EmptyState from '@/components/EmptyState'
import FavoritesClient from './FavoritesClient'

import getCurrentUser from '@/actions/getCurrentUser'
import getFavorites from '@/actions/getFavorites'

const FavoritesPage = async () => {
  const listings = await getFavorites()
  const currentUser = await getCurrentUser()

  if (listings.length === 0) {
    return (
      <EmptyState
        title="No favorites found"
        subtitle="Looks like you have no favorites listings"
      />
    )
  }
  return <FavoritesClient listings={listings} currentUser={currentUser} />
}

export default FavoritesPage

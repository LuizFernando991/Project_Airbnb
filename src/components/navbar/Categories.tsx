'use client'

import Container from '../Container'
import CategoryBox from '../CategoryBox'
import { categories } from '@/helpers/categorieslist'
import { usePathname, useSearchParams } from 'next/navigation'

const Categories: React.FC = () => {
  const params = useSearchParams()

  const category = params?.get('category')
  const pathname = usePathname()

  if (!(pathname === '/')) {
    return null
  }

  return (
    <Container>
      <div
        className="
          pt-4
          flex
          flex-row
          items-center
          justify-between
          overflow-x-auto
        "
      >
        {categories.map((cat) => (
          <CategoryBox
            key={cat.label}
            label={cat.label}
            selected={cat.label === category}
            icon={cat.icon}
          />
        ))}
      </div>
    </Container>
  )
}

export default Categories

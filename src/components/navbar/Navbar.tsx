'use client'

import Container from '../Container'
import Categories from './Categories'
import Logo from './Logo'
import Search from './Search'
import UserMenu from './UserMenu'
import { SafeUser } from '@/types'

interface INavbarProps {
  currentUser?: SafeUser | null
}

const Navbar: React.FC<INavbarProps> = ({ currentUser }) => {
  return (
    <header className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div
            className="
              flex
              flex-row
              items-center
              justify-between
              gap-3
              md:gap-0
            "
          >
            <div className="flex-1">
              <Logo />
            </div>
            <div className="flex-1 flex justify-center">
              <Search />
            </div>
            <div className="flex-1 flex justify-end">
              <UserMenu currentUser={currentUser} />
            </div>
          </div>
        </Container>
      </div>
      <Categories />
    </header>
  )
}

export default Navbar

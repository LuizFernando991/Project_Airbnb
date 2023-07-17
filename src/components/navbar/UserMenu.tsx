'use client'

import { useCallback, useState } from 'react'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { AiOutlineMenu } from 'react-icons/ai'
import Avatar from '../Avatar'
import MenuItem from './MenuItem'
import useRegisterModal from '@/hooks/useRegisterModal'
import useLoginModal from '@/hooks/useLoginModal'
import useRentModel from '@/hooks/useRentModel'

import { SafeUser } from '@/types'

interface IUserMenuProps {
  currentUser?: SafeUser | null
}

const UserMenu: React.FC<IUserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false)
  const rentModel = useRentModel()
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const router = useRouter()

  const toggleOpenMenu = useCallback(() => {
    setIsOpen((value) => !value)
  }, [])

  const onRent = useCallback(() => {
    if (!currentUser) {
      loginModal.onOpen()
      return
    }

    rentModel.onOpen()
  }, [loginModal, rentModel, currentUser])

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="
            hidden
            md:block
            text-sm
            font-semibold
            py-3
            px-4
            rounded-full
            hover:bg-neutral-100
            transition
            cursor-pointer
          "
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpenMenu}
          className="
           p-4
           md:py-1
           md:px-2
           border-[1px]
           border-neutral-200
           flex
           flex-row
           items-center
           gap-3
           rounded-full
           cursor-pointer
           hover:shadow-md
           transition
          "
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="
            absolute
            rounded-xl
            shadow-md
            w-[40vw]
            md:w-3/4
            bg-white
            overflow-hidden
            right-0
            top-10
            text-sm
          "
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  onClick={() => router.push('trips')}
                  label="My trips"
                />
                <MenuItem
                  onClick={() => router.push('favorites')}
                  label="My favorites"
                />
                <MenuItem
                  onClick={() => router.push('reservations')}
                  label="My reservations"
                />
                <MenuItem
                  onClick={() => rentModel.onOpen()}
                  label="Airbnb my home"
                />
                <hr />
                <MenuItem onClick={() => signOut()} label="Logout" />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label="Login" />
                <MenuItem onClick={registerModal.onOpen} label="Sing up" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default UserMenu

'use client'

import Image from 'next/image'

interface IAvatarProps {
  src: string | null | undefined
}

const Avatar: React.FC<IAvatarProps> = ({ src }) => {
  return (
    <Image 
      alt='Avatar'
      className='rounded-full'
      height='30'
      width='30'
      src={src || '/images/placeholder.jpg'}
    />
  )
}

export default Avatar
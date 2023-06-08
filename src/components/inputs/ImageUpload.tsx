'use client'

import Image from 'next/image'
import { useCallback } from 'react'
import { CldUploadWidget } from 'next-cloudinary'
import { TbPhotoPlus } from 'react-icons/tb'

declare global {
  var cloudinary: any;
}

interface IImageUploadProps {
  onChange: (value: string) => void
  value: string
}

const ImageUpload: React.FC<IImageUploadProps> = ({
  onChange,
  value
}) => {
  const handleUpload = useCallback((result: any) => {
    onChange(result.info.secure_url)
  }, [onChange])

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET_KEY}
      options={{
        maxFiles: 1
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => {
              if (!open) {
                return
              }
              open()
            }}
            className='
              relative
              cursor-pointer
              hover:opacity-70
              transition
              border-dashed
              border-2
              p-20
              border-neutral-300
              flex
              flex-col
              justify-center
              items-center
              gap-4
              text-neutral-600
            '
          >
            <TbPhotoPlus size={50}/>
            <div className='font-semibold text-lg'>
              Click to upload
            </div>
            {value && (
              <div
                className='absolute inset-0 w-full h-full'
              >
                <Image 
                  alt='upload'
                  fill
                  style={{ objectFit: 'cover'}}
                  src={value}
                />
              </div>
            )}
          </div>
        )
      }}
    </CldUploadWidget>
  )
}

export default ImageUpload
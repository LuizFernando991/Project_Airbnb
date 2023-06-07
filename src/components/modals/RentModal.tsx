'use client'

import { useState, useMemo } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import useRentModel from '@/hooks/useRentModel'
import Modal from './Modal'
import Heading from '../Heading'
import CategoryInput from '../inputs/CategoryInput'
import { categories } from '@/helpers/categorieslist'

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5
}

const RentModal: React.FC = () => {

  const [step, setStep] = useState(STEPS.CATEGORY)
  const rentModal = useRentModel()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {
      errors,
    },
    reset
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      localtion: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      desciption: ''
    }
  })

  // useForm callback when category changes
  const category = watch('category')
  
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    })
  }

  const onBack = () => {
    setStep((value) => value - 1)
  }

  const onNext = () => {
    setStep((value) => value + 1)
  }

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return 'Create'
    }
    return 'Next'
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined
    }
    return 'Back'
  }, [step])


  let bodyContent = (
    <div
      className='
        flex
        flex-col
        gap-8
      '
    >
      <Heading
        title='Which of these best describes your place?'
        subtitle='Chose a category'
      />
      <div
        className='
          grid
          grid-cols-1
          md:grid-cols-2
          gap-3
          max-h-[50vh]
          overflow-y-auto
        '
      >
        {categories.map((cat) => (
          <div key={cat.label} className='col-span-1'>
            <CategoryInput 
              onClick={
                (cat) => setCustomValue('category', cat)
              }
              selected={category === cat.label}
              label={cat.label}
              icon={cat.icon}
            />
          </div>
        ))}
      </div>
    </div>
  )
  return (
    <Modal
      title='Airbnb your home'
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={rentModal.onClose}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      body={bodyContent}
    />
  )
}

export default RentModal
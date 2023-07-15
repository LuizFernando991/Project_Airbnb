import { create } from 'zustand'

interface IRentModalStore {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const useRentModel = create<IRentModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))

export default useRentModel

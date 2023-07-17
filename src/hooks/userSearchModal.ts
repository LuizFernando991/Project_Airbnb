import { create } from 'zustand'

interface ISearchModalStore {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const useSearchModal = create<ISearchModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))

export default useSearchModal

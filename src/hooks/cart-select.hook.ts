import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ShoppingCart } from 'src/types/interfaces'

interface CartSelectState {
  shoppingCart: ShoppingCart[];
  selectedMap: Record<number, boolean>;
  totalProductPrice: number;
  setShoppingCart: (shoppingCarts: ShoppingCart[]) => void;
  setTotalProductPrice:(total:number) => void;
  toggle: (id: number) => void;
  setSelectAll: (ids: number[]) => void;
  clear: () => void;
  getSelectedIds: () => number[];
  getShoppingCarts: () => ShoppingCart[];
}

const useShoppingCartSelectStore = create<CartSelectState>()(
  persist(
    (set, get) => ({
      shoppingCart: [],
      selectedMap: {},
      totalProductPrice: 0,

      setShoppingCart: (shoppingCarts) => set({ shoppingCart: shoppingCarts }),

      setTotalProductPrice: (total:number) => 
        set((state) => state.totalProductPrice !== total
              ? {totalProductPrice: total} : state),

      toggle: (id) =>
        set((state) => ({
          selectedMap: {
            ...state.selectedMap,
            [id]: !state.selectedMap[id],
          },
        })),

      setSelectAll: (ids) =>
        set(() => ({
          selectedMap: ids.reduce((acc, id) => ({ ...acc, [id]: true }), {}),
        })),

      clear: () => set(() => ({ selectedMap: {} })),

      getSelectedIds: () => {
        const selected = get().selectedMap;
        return Object.keys(selected)
          .filter((key) => selected[+key])
          .map((id) => +id);
      },

      getShoppingCarts: () => get().shoppingCart,
    }),
    {
      name: 'shoppingCart',
      partialize: (state) => {
        const selectedIds = Object.keys(state.selectedMap)
          .filter((key) => state.selectedMap[+key])
          .map((id) => +id);

        return {
          shoppingCart: state.shoppingCart.filter((cart) =>
            selectedIds.includes(cart.shoppingCartSequence)
          ),
          selectedMap: state.selectedMap,
          totalPrice: state.totalProductPrice
        };
      },
    }
  )
)

export default useShoppingCartSelectStore

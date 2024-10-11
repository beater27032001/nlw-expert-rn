import { ProductProps } from "@/utils/data/products";
import { create } from "zustand";

import * as cartInMemory from "@/stores/helpers/cart-in-memory";

export type ProductCartProps = ProductProps & {
  quantity: number;
};

type StateProps = {
  products: ProductCartProps[];
  add: (product: ProductProps) => void;
};

export const useCartStore = create<StateProps>((set) => ({
  products: [],

  add: (product: ProductProps) =>
    set((state) => ({
      products: cartInMemory.add(state.products, product),
    })),
}));

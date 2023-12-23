import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

export interface CartItem {
  cartId: number;
  product: Product;
}

export interface CartStateModel {
  items: CartItem[];
  lastCartId: number;
}

export class AddToCart {
  static readonly type = '[Cart] Add';
  constructor(public payload: Product) {}
}

export class RemoveFromCart {
  static readonly type = '[Cart] Remove';
  constructor(public payload: number) {}
}

@State<CartStateModel>({
  name: 'cart',
  defaults: {
    items: [],
    lastCartId: 0
  }
})
@Injectable()
export class CartState {
  @Selector()
  static itemCount(state: CartStateModel): number {
    return state.items.length;
  }

  @Selector()
  static cartItems(state: CartStateModel): CartItem[] {
    return state.items;
  }

  @Action(AddToCart)
  add({ getState, patchState }: StateContext<CartStateModel>, { payload }: AddToCart): void {
    const state = getState();
    const cartId = state.lastCartId + 1; 
    let newItem: CartItem = {
      cartId: cartId,
      product: payload
    };
    patchState({
      items: [...state.items, newItem],
      lastCartId: cartId 
    });
  }
  
  @Action(RemoveFromCart)
  remove({ getState, patchState }: StateContext<CartStateModel>, { payload }: RemoveFromCart): void {
    patchState({
      items: getState().items.filter(item => item.cartId !== payload) // Filtre par cartId.
    });
  }
}

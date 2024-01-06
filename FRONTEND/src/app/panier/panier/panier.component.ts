import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CartState, RemoveFromCart, CartItem } from '../panier.state';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent {
  @Select(CartState.cartItems) cart$!: Observable<CartItem[]>; 

  constructor(private store: Store) {}

  removeFromCart(cartId: number) {
    this.store.dispatch(new RemoveFromCart(cartId));
  }
}

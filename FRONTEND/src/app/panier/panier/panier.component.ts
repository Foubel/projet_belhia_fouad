import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CartState, RemoveFromCart, CartItem } from '../panier.state'; // Assurez-vous que le chemin d'accès est correct.

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent {
  @Select(CartState.cartItems) cart$!: Observable<CartItem[]>; // Doit être Observable de CartItem[].

  constructor(private store: Store) {}

  // Utilisez cartId pour supprimer un article spécifique.
  removeFromCart(cartId: number) {
    this.store.dispatch(new RemoveFromCart(cartId));
  }
}

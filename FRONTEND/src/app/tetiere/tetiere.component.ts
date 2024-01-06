// tetiere.component.ts
import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CartState, ClearCart } from '../panier/panier.state';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-tetiere',
  templateUrl: './tetiere.component.html',
  styleUrls: ['./tetiere.component.css']
})
export class TetiereComponent {
  @Select(CartState.itemCount) itemCount$!: Observable<number>;
  @Select(CartState.total) total$!: Observable<number>;

  constructor(private store: Store) {}

  payer(): void {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  
    this.store.dispatch(new ClearCart());
  
    alert('Merci pour votre achat!');
  }
  

}

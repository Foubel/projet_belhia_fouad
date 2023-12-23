// tetiere.component.ts
import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CartState } from '../panier/panier.state'; // Ajustez le chemin si nécessaire

@Component({
  selector: 'app-tetiere',
  templateUrl: './tetiere.component.html',
  styleUrls: ['./tetiere.component.css']
})
export class TetiereComponent {
  @Select(CartState.itemCount) itemCount$!: Observable<number>;

}

import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError, map, startWith } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth.service';
import { Store } from '@ngxs/store';
import { AddToCart, RemoveFromCart } from '../panier/panier.state';


@Component({
  selector: 'app-liste-produits',
  templateUrl: './liste-produits.component.html',
  styleUrls: ['./liste-produits.component.css']
})
export class ListeProduitsComponent implements OnInit {
  produits$!: Observable<any[]>; 
  private searchTerms = new Subject<any>();

  constructor(private http: HttpClient, private authService: AuthService, private store: Store) { }

  ngOnInit(): void {
    this.produits$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      startWith({}),
      switchMap((searchTerms) => {
        return this.searchProducts(searchTerms);
      }),  
      map(response => Object.values(response)),
      catchError(error => {
        console.error(error);
        return [];
      })
    );
  }
  

  applyFilters(searchTerms: any): void {
    this.searchTerms.next(searchTerms);
  }

  private searchProducts(searchTerms: any): Observable<any[]> {
    const jwtToken = this.authService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${jwtToken}` });
    const params = new HttpParams({ fromObject: searchTerms });

    return this.http.get<any[]>(environment.backendCatalogue, { headers, params });
  }


  addToCart(product: any): void {
    this.store.dispatch(new AddToCart(product));
  }

  removeFromCart(id: number): void {
    this.store.dispatch(new RemoveFromCart(id));
  }
}

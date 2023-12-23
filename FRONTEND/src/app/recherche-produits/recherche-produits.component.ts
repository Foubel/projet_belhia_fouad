import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-recherche-produits',
  templateUrl: './recherche-produits.component.html',
  styleUrls: ['./recherche-produits.component.css']
})
export class RechercheProduitsComponent {
  @Output() searchEvent = new EventEmitter<any>();

  searchTerms = {
    id: '',
    name: '',
    description: '',
    price: ''
  };

  search() {
    const newSearchTerms = {
      id: this.searchTerms.id,
      name: this.searchTerms.name,
      description: this.searchTerms.description,
      price: this.searchTerms.price
    };  
    this.searchEvent.emit(newSearchTerms);
  }

  resetFilters() {
    this.searchTerms = { id: '', name: '', description: '', price: '' };
    this.searchEvent.emit(this.searchTerms);
  }
}

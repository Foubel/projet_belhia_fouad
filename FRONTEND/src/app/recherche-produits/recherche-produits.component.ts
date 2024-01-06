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
  };

  search() {
    const newSearchTerms = {
      id: this.searchTerms.id,
      name: this.searchTerms.name,
      description: this.searchTerms.description,
    };  
    this.searchEvent.emit(newSearchTerms);
  }

  resetFilters() {
    this.searchTerms = { id: '', name: '', description: ''};
    this.searchEvent.emit(this.searchTerms);
  }
}

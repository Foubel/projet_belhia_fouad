import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanierComponent } from './panier/panier.component';

@NgModule({
  declarations: [
    PanierComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PanierComponent
  ]
})
export class PanierModule { }

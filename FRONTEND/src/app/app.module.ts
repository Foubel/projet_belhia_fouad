import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ListeProduitsComponent } from './liste-produits/liste-produits.component';
import { RechercheProduitsComponent } from './recherche-produits/recherche-produits.component';
import { NgxsModule } from '@ngxs/store';
import { CartState } from './panier/panier.state';
import { TetiereComponent } from './tetiere/tetiere.component';
import { PanierModule } from './panier/panier.module';
import { LoginComponent } from './login/login.component';
import { ApiHttpInterceptor } from '../http-interceptor';
import { InscriptionComponent } from './inscription/inscription.component';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    ListeProduitsComponent,
    RechercheProduitsComponent,
    TetiereComponent,
    LoginComponent,
    InscriptionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgxsModule.forRoot([CartState]),
    PanierModule,
    AppRoutingModule,
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: ApiHttpInterceptor, multi: true }, ApiHttpInterceptor],
  bootstrap: [AppComponent],
})
export class AppModule { }

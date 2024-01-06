import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Projet-TP';
  isLogged = false;
  nom: string = '';
  prenom: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  routeIsActive(route: string) {
    return this.router.url === route;
  }

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe(loggedIn => {
      this.isLogged = loggedIn;
    })
    this.authService.nom.subscribe(nom => {
      this.nom = nom;
    })
    this.authService.prenom.subscribe(prenom => {
      this.prenom = prenom;
    })
    ;
  }
}
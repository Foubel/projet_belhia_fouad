import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

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

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isLogged = this.authService.isLogged();
  }

  onLoginSuccess(user: { nom: string; prenom: string }): void {
    this.isLogged = true;
    this.nom = user.nom.toUpperCase();
    // première lettre en majuscule
    this.prenom = user.prenom.charAt(0).toUpperCase() + user.prenom.slice(1);
  }
}
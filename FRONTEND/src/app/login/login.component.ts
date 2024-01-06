import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  nom: string = '';
  prenom: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.username, this.password).subscribe(
      data => {
        this.nom = data.nom;
        this.prenom = data.prenom;
        console.log('Réponse de connexion', data);
        this.authService.setLoggedIn(true);
        this.authService.setUserData(this.nom, this.prenom);
      },
      error => {
        this.onLoginFailure();
        console.error('Erreur de connexion', error);
      }
    );
  }

  onLoginFailure() {
    alert('Erreur de connexion. Login ou mot de passe incorrect.');
  }
}

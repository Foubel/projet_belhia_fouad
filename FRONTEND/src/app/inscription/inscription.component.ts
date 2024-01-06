// inscription.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent {
  nom = '';
  prenom = '';
  adresse = '';
  codePostal = '';
  ville = '';
  email = '';
  sexe: string = 'H';
  login = '';
  password = '';
  telephone = '';

  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    const user = { nom: this.nom, prenom: this.prenom, adresse: this.adresse, codePostal: this.codePostal, ville: this.ville, email: this.email, sexe: this.sexe, login: this.login, password: this.password, telephone: this.telephone };
    this.authService.register(user).subscribe(
      data => {
        console.log('Inscription réussie', data);
        this.onRegisterSuccess();
      },
      error => {
        console.error('Erreur d\'inscription', error);
        this.onRegisterError();
      }
    );
  }

  onRegisterSuccess() {
    alert('Inscription réussie. Vous pouvez maintenant vous connecter.');
    this.router.navigate(['/login']);
  }

  onRegisterError() {
    alert('Erreur d\'inscription. Remplissez tous les champs correctement puis réessayez.');
  }
  
}

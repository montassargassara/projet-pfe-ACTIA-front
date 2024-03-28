import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  canActivate(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      // Vérifiez si l'utilisateur est connecté en utilisant localStorage
      const isLoggedIn = localStorage.getItem('user') ? true : false;
      if (isLoggedIn) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    } else {
      // Si nous sommes côté serveur, redirigez toujours vers la page de connexion
      this.router.navigate(['/login']);
      return false;
    }
  }
}
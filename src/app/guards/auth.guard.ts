import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof sessionStorage !== 'undefined';
  }

  canActivate(): boolean {
    if (this.isBrowser()) {
      const isAuthenticated = !!sessionStorage.getItem('usuarioActual'); // Verifica autenticación
      if (!isAuthenticated) {
        this.router.navigate(['/login']); // Redirige a login si no está autenticado
        return false;
      }
      return true;
    } else {
      // Si no está en un navegador, bloquea el acceso
      this.router.navigate(['/login']);
      return false;
    }
  }
}
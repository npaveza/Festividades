import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // Hace que este servicio esté disponible en toda la aplicación
})
export class AuthService {
  private storageKey = 'usuarioActual';

  constructor() {}

  getUsuarioActual(): any {
    const usuario = localStorage.getItem(this.storageKey);
    return usuario ? JSON.parse(usuario) : null;
  }

  setUsuarioActual(usuario: any): void {
    localStorage.setItem(this.storageKey, JSON.stringify(usuario));
  }

  eliminarUsuarioActual(): void {
    localStorage.removeItem(this.storageKey);
  }

  isLoggedIn(): boolean {
    return !!this.getUsuarioActual();
  }

  isOrganizador(): boolean {
    const usuario = this.getUsuarioActual();
    return usuario?.tipoUsuario === 'organizador';
  }
}

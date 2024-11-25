import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

/**
* @description
* Este componente es el encargado de mostrar la barra de navegación de la aplicación.
* @see [NavbarComponent]({% link src/app/components/navbar/navbar.component.ts %})
* @see [NavbarComponent.html]({% link src/app/components/navbar/navbar.component.html %})
* @see [NavbarComponent.css]({% link src/app/components/navbar/navbar.component.css %})
**/
/**
 * @usateNotes
 * 1. Muestra menú completo con sesión iniciada.
 * 2. Muestra menú organizador con sesión iniciada.
 * 3. Muestra menú usuario con sesión iniciada.
 * 4. Muestra menú sin sesión iniciada.
 * 5. Muestra menú con sesión iniciada y cerrar sesión.
 * 6. Muestra menú con sesión iniciada y cerrar sesión.
**/

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  usuarioActual: any = null; // Variable para almacenar los datos del usuario conectado

  constructor(private router: Router) {
    this.cargarUsuario(); // Carga el usuario al iniciar
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof sessionStorage !== 'undefined';
  }

  cargarUsuario() {
      if (this.isBrowser()) {
        const usuario = sessionStorage.getItem('usuarioActual');
        this.usuarioActual = usuario ? JSON.parse(usuario) : null;
      }
    }

  isLoggedIn(): boolean {
    return !!this.usuarioActual;
  }

  isOrganizador(): boolean {
    return this.usuarioActual?.tipoUsuario === 'organizador';
  }

  cerrarSesion() {
    if (this.isBrowser()) {
      sessionStorage.removeItem('usuarioActual');
      this.usuarioActual = null; // Resetea el usuario actual
    }
    this.router.navigate(['/']);
  }
}

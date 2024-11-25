import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

/**
* @description
* Componente que muestra el menú de navegación de la aplicación
*
* Este componente contiene los enlaces a las diferentes páginas de la aplicación.
* El menú de navegación varía según el tipo de usuario que inicie sesión.
*
**/
/**
 * @usateNotes
 * 1. Importar el componente en el módulo de la aplicación
 * 2- Importar el componente en el módulo de la aplicación
 * 3. Usar el componente en el template de la aplicación
**/


@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})

export class IndexComponent {
  isOrganizador() {
    const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual') || '{}');
    return usuarioActual && usuarioActual.tipoUsuario === 'organizador';
  }
}
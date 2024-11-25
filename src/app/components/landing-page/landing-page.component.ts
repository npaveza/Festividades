import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

/**
* @description
* Este es un componente de Landing Page
* que se usa para mostrar la página de inicio de la aplicación
**/
/**
 * @usateNotes
 * 1. Este componente es usado en el router de la aplicación
**/


@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
  sesionIniciada: boolean = false; // Indica si hay sesión iniciada

  ngOnInit(): void {
    // Verifica si hay un usuario actual en LocalStorage
    this.sesionIniciada = !!localStorage.getItem('usuarioActual');
  }
}
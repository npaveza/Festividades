import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

/**
* @description
* Este componente es el encargado de mostrar los eventos de la aplicación.
**/
/**
 * @usateNotes
 * 1. Muestra eventos.
 * 2. Permite entrar a revisar de un evento puntual al detalle en componente evento-detalle
 * **/

@Component({
  selector: 'app-ver-eventos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './ver-eventos.component.html',
  styleUrls: ['./ver-eventos.component.css'],
})
export class VerEventosComponent implements OnInit {
  eventos: any[] = [];

    ngOnInit() {
      const usuarioActual = sessionStorage.getItem('usuarioActual');
      if (usuarioActual) {
        this.eventos = JSON.parse(localStorage.getItem('eventos') || '[]');
      } else {
        console.error('No hay sesión activa.');
      }
    }
}

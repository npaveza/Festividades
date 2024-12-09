import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
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
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './ver-eventos.component.html',
  styleUrls: ['./ver-eventos.component.css'],
})
export class VerEventosComponent implements OnInit {
  eventos: any[] = [];
  readonly jsonUrl = 'https://fsiinpavez.s3.us-east-1.amazonaws.com/evento.json';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const usuarioActual = sessionStorage.getItem('usuarioActual');
    if (usuarioActual) {
      this.cargarEventos();
    } else {
      console.error('No hay sesión activa.');
    }
  }

  /**
   * Carga los eventos desde el JSON alojado en S3
   */
  cargarEventos(): void {
    this.http.get<any[]>(this.jsonUrl).subscribe(
      (data) => {
        this.eventos = data || [];
        console.log('Eventos cargados:', this.eventos);
      },
      (error) => {
        console.error('Error al cargar el archivo JSON desde S3:', error);
        alert('No se pudieron cargar los eventos. Revisa la configuración.');
      }
    );
  }
}
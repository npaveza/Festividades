import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
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
  imports: [RouterModule, CommonModule, HttpClientModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
  sesionIniciada: boolean = false; // Indica si hay sesión iniciada

  // URL del JSON en S3
  private readonly jsonUrl = 'https://fsiinpavez.s3.us-east-1.amazonaws.com/usuario.json';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Consultar el JSON en S3 para verificar si hay un usuario activo
    this.http.get<any[]>(this.jsonUrl).subscribe(
      (usuarios) => {
        // Validar si existe un usuario marcado como "activo"
        this.sesionIniciada = usuarios.some((usuario) => usuario.activo === true);
      },
      (error) => {
        console.error('Error al obtener datos desde S3:', error);
      }
    );
  }
}
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';


/**
* @description
* Componente que muestra el detalle de un evento
* El componente recibe el id del evento a mostrar por parámetro
* El componente muestra los detalles del evento
* El componente permite agregar comentarios al evento
* El componente permite eliminar comentarios del evento
**/
/**
 * @usateNotes
 * 1. Importar el componente en el módulo de la aplicación
 * 2- Importar el componente en el módulo de la aplicación
 * 3. Usar el componente en el template de la aplicación
**/



@Component({
  selector: 'app-evento-detalle',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, HttpClientModule],
  templateUrl: './evento-detalle.component.html',
  styleUrl: './evento-detalle.component.css'
})
export class EventoDetalleComponent implements OnInit {
  evento: any = null;
  nuevoComentario: string = ''; // Variable para el comentario nuevo
  readonly jsonUrl = 'https://fsiinpavez.s3.us-east-1.amazonaws.com/evento.json';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.cargarEvento(id);
    } else {
      console.error('No se proporcionó un ID válido.');
    }
  }

  /**
   * Carga los detalles del evento desde el archivo JSON en S3
   * @param {string} id - ID del evento a cargar
   */
  cargarEvento(id: string): void {
    this.http.get<any[]>(this.jsonUrl).subscribe(
      (data) => {
        const eventos = data || [];
        this.evento = eventos.find((e: any) => e.id === id);

        if (!this.evento) {
          alert('No se encontró el evento solicitado.');
          console.error('Evento no encontrado.');
        }
      },
      (error) => {
        console.error('Error al cargar el archivo JSON desde S3:', error);
        alert('No se pudieron cargar los detalles del evento. Revisa la configuración.');
      }
    );
  }

  /**
   * Agrega un comentario al evento y lo actualiza en S3
   */
  agregarComentario(): void {
    if (this.nuevoComentario.trim()) {
      this.evento.comentarios.push(this.nuevoComentario); // Agregar comentario

      // Actualizar el archivo JSON en S3
      this.actualizarEventosEnS3();

      this.nuevoComentario = ''; // Limpiar el input del comentario
      alert('Comentario agregado correctamente.');
    } else {
      alert('El comentario no puede estar vacío.');
    }
  }

  /**
   * Elimina un comentario del evento y lo actualiza en S3
   * @param {string} comentario - Comentario a eliminar
   */
  confirmarEliminarComentario(comentario: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar este comentario?')) {
      const index = this.evento.comentarios.indexOf(comentario);
      if (index !== -1) {
        this.evento.comentarios.splice(index, 1); // Eliminar comentario

        // Actualizar el archivo JSON en S3
        this.actualizarEventosEnS3();

        alert('Comentario eliminado correctamente.');
      }
    }
  }

  /**
   * Actualiza el archivo JSON en S3 con los cambios realizados
   */
  actualizarEventosEnS3(): void {
    this.http.get<any[]>(this.jsonUrl).subscribe(
      (data) => {
        const eventos = data || [];
        const index = eventos.findIndex((e: any) => e.id === this.evento.id);
        if (index !== -1) {
          eventos[index] = this.evento;

          this.http.put(this.jsonUrl, eventos).subscribe(
            () => {
              console.log('Archivo JSON actualizado en S3');
            },
            (error) => {
              console.error('Error al actualizar el archivo JSON en S3:', error);
              alert('No se pudo actualizar el archivo JSON. Revisa la configuración.');
            }
          );
        }
      },
      (error) => {
        console.error('Error al cargar el archivo JSON desde S3:', error);
      }
    );
  }
}
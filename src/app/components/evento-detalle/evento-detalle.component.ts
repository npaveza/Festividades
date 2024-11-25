import { CommonModule } from '@angular/common';
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
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './evento-detalle.component.html',
  styleUrl: './evento-detalle.component.css'
})
export class EventoDetalleComponent implements OnInit {
  evento: any;
  nuevoComentario: string = ''; // Variable para el comentario nuevo

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const eventos = JSON.parse(localStorage.getItem('eventos') || '[]');
    const id = this.route.snapshot.paramMap.get('id');
    this.evento = eventos.find((e: any) => e.id === id);
  }

  /**
   * @param {string} comentario - Comentario a eliminar
   * @description
   * Elimina un comentario del evento
   * **/

  confirmarEliminarComentario(comentario: string) {
    if (confirm('¿Estás seguro de que deseas eliminar este comentario?')) {
      this.eliminarComentario(comentario);
    }
  }
  
  eliminarComentario(comentario: string) {
    const index = this.evento.comentarios.indexOf(comentario);
    if (index !== -1) {
      this.evento.comentarios.splice(index, 1); // Eliminar comentario

      // Actualizar el evento en LocalStorage
      const eventos = JSON.parse(localStorage.getItem('eventos') || '[]');
      const indexEvento = eventos.findIndex((e: any) => e.id === this.evento.id);
      if (indexEvento !== -1) {
        eventos[indexEvento] = this.evento;
        localStorage.setItem('eventos', JSON.stringify(eventos));
      }

      alert('Comentario eliminado correctamente.');
    }
  }

  /**
   * @param {string} nuevoComentario - Comentario a agregar
   * @description
   * Agrega un comentario al evento
   * **/

  agregarComentario() {
    if (this.nuevoComentario.trim()) {
      this.evento.comentarios.push(this.nuevoComentario); // Agregar comentario

      // Actualizar el evento en LocalStorage
      const eventos = JSON.parse(localStorage.getItem('eventos') || '[]');
      const index = eventos.findIndex((e: any) => e.id === this.evento.id);
      if (index !== -1) {
        eventos[index] = this.evento;
        localStorage.setItem('eventos', JSON.stringify(eventos));
      }

      this.nuevoComentario = ''; // Limpiar el input del comentario
      alert('Comentario agregado correctamente.');
    } else {
      alert('El comentario no puede estar vacío.');
    }
  }
}
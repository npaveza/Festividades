import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; // Agrega ReactiveFormsModule aquí

/**
* @description
* Componente para agregar un evento
**/
/**
 * @usateNotes
 * Este componente permite al usuario agregar un nuevo evento.
 * Utiliza un formulario para recopilar la información del evento.
 * Los datos del evento se guardan en el almacenamiento local (LocalStorage) y se restablece el formulario después de agregar el evento.
**/


@Component({
  selector: 'app-agregar-evento',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './agregar-evento.component.html',
  styleUrl: './agregar-evento.component.css'
})
export class AgregarEventoComponent {

  eventoForm: FormGroup;
  readonly jsonUrl = 'https://fsiinpavez.s3.us-east-1.amazonaws.com/evento.json';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    // Definición del formulario y sus validaciones
    this.eventoForm = this.fb.group({
      nombre: ['', Validators.required],
      lugar: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      puestos: [''],
      entrada: [0, [Validators.min(0)]],
      estacionamiento: [false],
    });
  }

  /**
   * Agrega un nuevo evento al archivo JSON en S3
   */
  agregarEvento() {
    if (this.eventoForm.valid) {
      // Crear un nuevo evento con todos los datos del formulario y un ID único
      const nuevoEvento = {
        id: Date.now().toString(), // Generar un ID único basado en el tiempo
        ...this.eventoForm.value,
        comentarios: [], // Inicializamos el array de comentarios vacío
      };

      console.log('Evento a agregar:', nuevoEvento);

      // Leer el archivo JSON desde S3
      this.http.get<any[]>(this.jsonUrl).subscribe(
        (eventos) => {
          eventos = eventos || [];
          eventos.push(nuevoEvento); // Agregar el nuevo evento al array

          // Actualizar el archivo JSON en S3
          this.http.put(this.jsonUrl, eventos).subscribe(
            () => {
              alert('Evento agregado correctamente.');
              // Restablecer el formulario a sus valores predeterminados
              this.eventoForm.reset({
                nombre: '',
                lugar: '',
                fecha: '',
                hora: '',
                puestos: '',
                entrada: 0,
                estacionamiento: false,
              });
            },
            (error) => {
              console.error('Error al guardar el evento en S3:', error);
              alert('No se pudo agregar el evento. Intenta nuevamente.');
            }
          );
        },
        (error) => {
          console.error('Error al leer el archivo JSON desde S3:', error);
          alert('No se pudieron cargar los eventos. Intenta nuevamente.');
        }
      );
    } else {
      alert('Por favor, completa todos los campos obligatorios.');
    }
  }
}
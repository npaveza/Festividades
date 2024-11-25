import { CommonModule } from '@angular/common';
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
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './agregar-evento.component.html',
  styleUrl: './agregar-evento.component.css'
})
export class AgregarEventoComponent {

eventoForm: FormGroup;

constructor(private fb: FormBuilder) {
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
 * @param eventoForm
 * @description
 * Función para agregar un evento con información del formulario al almacenamiento local
 * @returns {void}
 * **/

agregarEvento() {
  if (this.eventoForm.valid) {
    // Crear un nuevo evento con todos los datos del formulario y un ID único
    const nuevoEvento = {
      id: Date.now().toString(), // Generar un ID único basado en el tiempo
      ...this.eventoForm.value,
      comentarios: [], // Inicializamos el array de comentarios vacío
    };

    /**
     * @param nuevoEvento
     * @description
     * Agrega el nuevo evento al array de eventos en el almacenamiento local
     * @returns {void}
     * **/

    console.log('Evento agregado:', nuevoEvento);

    // Guardar el evento en LocalStorage
    const eventos = JSON.parse(localStorage.getItem('eventos') || '[]');
    eventos.push(nuevoEvento);
    localStorage.setItem('eventos', JSON.stringify(eventos));

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
    alert('Evento agregado correctamente');
  } else {
    alert('Por favor, completa todos los campos obligatorios.');
  }
}
}
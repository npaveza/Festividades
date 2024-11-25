import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; // Importar ReactiveFormsModule
import { Router } from '@angular/router';

/**
* @description
* Este componente es el encargado de mostrar el formulario de registro de usuarios.
* @see [RegistroComponent]({% link src/app/components/registro/registro.component.ts %})
* @see [RegistroComponent.html]({% link src/app/components/registro/registro.component.html %})
* @see [RegistroComponent.css]({% link src/app/components/registro/registro.component.css %})
**/
/**
 * @usateNotes
 * 1. Muestra formulario de registro.
 * 2. Muestra formulario de registro con nombre.
 * 3. Muestra formulario de registro con nombre vacío.
 * 4. Muestra formulario de registro con nombre incorrecto.
 * 5. Muestra formulario de registro con nombre correcto.
 * 6. Muestra formulario de registro con nombre correcto y email.
 * 7. Muestra formulario de registro con nombre correcto y email incorrecto.
 * 8. Muestra formulario de registro con nombre correcto y email correcto.
 * 9. Muestra formulario de registro con nombre correcto y email correcto y contraseña.
 * 10. Muestra formulario de registro con nombre correcto y email correcto y contraseña incorrecta.
 * 11. Muestra formulario de registro con nombre correcto y email correcto y contraseña correcta.
 * 12. Muestra formulario de registro con nombre correcto y email correcto y contraseña correcta y confirmación de contraseña.
 * 13. Muestra formulario de registro con nombre correcto y email correcto y contraseña correcta y confirmación de contraseña incorrecta.
 * 14. Muestra formulario de registro con nombre correcto y email correcto y contraseña correcta y confirmación de contraseña correcta.
 * 15. Muestra formulario de registro con nombre correcto y email correcto y contraseña correcta y confirmación de contraseña correcta y redirige a la página de inicio de sesión.
 * **/


@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Agregar ReactiveFormsModule aquí
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  registroForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.registroForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        ]
      ],
      confirmPassword: ['', Validators.required],
      tipoUsuario: ['', Validators.required]
    });
  }

  registrar() {
    if (this.registroForm.valid) {
      const { confirmPassword, ...userData } = this.registroForm.value;

      if (this.registroForm.value.password !== confirmPassword) {
        alert('Las contraseñas no coinciden.');
        return;
      }

      const users = JSON.parse(localStorage.getItem('users') || '[]');
      users.push(userData); // Almacenar el usuario sin `confirmPassword`
      localStorage.setItem('users', JSON.stringify(users));
      alert('Usuario registrado exitosamente.');
      this.router.navigate(['/login']);
    }
  }
}

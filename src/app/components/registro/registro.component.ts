import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
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
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  registroForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  // URL del JSON en S3
  readonly jsonUrl = 'https://fsiinpavez.s3.us-east-1.amazonaws.com/usuario.json';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.registroForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|cl|net|org|edu)$/)
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&./]{8,}$/),
        ],
      ],
      confirmPassword: ['', Validators.required],
      tipoUsuario: ['', Validators.required],
    });
  }

  registrar() {
    if (this.registroForm.invalid) {
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
      return;
    }

    const { confirmPassword, ...newUser } = this.registroForm.value;

    if (newUser.password !== confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }

    // Leer usuarios del JSON
    this.http.get<any[]>(this.jsonUrl).subscribe(
      (users) => {
        // Validar si el usuario ya existe
        const userExists = users.some((user) => user.email === newUser.email);
        if (userExists) {
          this.errorMessage = 'Este correo ya está registrado.';
          return;
        }

        // Agregar el nuevo usuario
        users.push(newUser);

        // Simular guardar el archivo actualizado (requiere permiso para escribir en S3)
        this.http.put(this.jsonUrl, users).subscribe(
          () => {
            this.successMessage = 'Usuario registrado exitosamente.';
            setTimeout(() => this.router.navigate(['/login']), 1500);
          },
          (error) => {
            console.error('Error al guardar los datos:', error);
            this.errorMessage = 'Hubo un problema al registrar al usuario.';
          }
        );
      },
      (error) => {
        console.error('Error al leer el archivo JSON:', error);
        this.errorMessage = 'Hubo un problema al conectar con el servidor.';
      }
    );
  }
}
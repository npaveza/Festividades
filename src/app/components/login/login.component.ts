import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

/**
* @description
* Este es un componente de Login
* que se usa para mostrar el formulario de inicio de sesión
**/
/**
 * @usateNotes
 * 1. Este componente es utilizado para la funcionalidad de inicio de sesión.
 * 2. Utiliza el servicio de autenticación para verificar las credenciales del usuario.
 * 3. Si las credenciales son válidas, el usuario es redirigido a la página de inicio.
 * 4. Si las credenciales son inválidas, se muestra un mensaje de error.
 * **/


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  iniciarSesion() {
    if (this.loginForm.valid) {
      const userData = JSON.parse(localStorage.getItem('users') || '[]'); // Obtiene todos los usuarios registrados
      const user = userData.find(
        (u: any) =>
          u.email === this.loginForm.value.email &&
          u.password === this.loginForm.value.password
      );

      if (user) {
        // Usa sessionStorage para mantener la sesión activa
        sessionStorage.setItem('usuarioActual', JSON.stringify(user));
        this.router.navigate(['/index']); // Navega a la página de inicio
      } else {
        this.errorMessage = 'Usuario o contraseña incorrectos.';
      }
    } else {
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
    }
  }
}

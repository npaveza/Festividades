import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

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
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  // URL del JSON en S3
  readonly jsonUrl = 'https://fsiinpavez.s3.us-east-1.amazonaws.com/usuario.json';

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  iniciarSesion() {
    if (this.loginForm.valid) {
      // Realizar una solicitud GET para obtener los datos desde el JSON
      this.http.get<any[]>(this.jsonUrl).subscribe(
        (userData) => {
          const user = userData.find(
            (u: any) =>
              u.email === this.loginForm.value.email &&
              u.password === this.loginForm.value.password
          );

          if (user) {
            // Guardar el usuario actual en sessionStorage
            sessionStorage.setItem('usuarioActual', JSON.stringify(user));
            this.router.navigate(['/index']); // Redirigir al inicio
          } else {
            this.errorMessage = 'Usuario o contraseña incorrectos.';
          }
        },
        (error) => {
          console.error('Error al obtener datos desde S3:', error);
          this.errorMessage = 'Hubo un problema al conectar con el servidor.';
        }
      );
    } else {
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
    }
  }
}
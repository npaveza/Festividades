import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

/**
* @description
* Este componente es el encargado de mostrar el formulario de recuperación de contraseña.
* @see [RecuperaPasswordComponent]({% link src/app/components/recupera-password/recupera-password.component.ts %})
* @see [RecuperaPasswordComponent.html]({% link src/app/components/recupera-password/recupera-password.component.html %})
* @see [RecuperaPasswordComponent.css]({% link src/app/components/recupera-password/recupera-password.component.css %})
**/
/**
 * @usateNotes
 * 1. Muestra formulario de recuperación de contraseña.
 * 2. Muestra formulario de recuperación de contraseña con email.
 * 3. Muestra formulario de recuperación de contraseña con email vacío.
 * 4. Muestra formulario de recuperación de contraseña con email incorrecto.
 * 5. Muestra formulario de recuperación de contraseña con email correcto.
 * 6. Muestra formulario de recuperación de contraseña con email correcto y clave.
 * 7. Muestra formulario de recuperación de contraseña con email correcto y clave incorrecta.
 * 8. Muestra formulario de recuperación de contraseña con email correcto y clave correcta.
 * 9. Muestra formulario de recuperación de contraseña con email correcto y clave correcta y redirige a la página de inicio de sesión.
**/

@Component({
  selector: 'app-recupera-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './recupera-password.component.html',
  styleUrls: ['./recupera-password.component.css']
})
export class RecuperaPasswordComponent {
  recuperarForm: FormGroup;
  private s3Url = 'https://fsiinpavez.s3.us-east-1.amazonaws.com/usuario.json'; // URL del JSON en S3

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.recuperarForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  recuperar() {
    const email = this.recuperarForm.value.email;

    // Realiza una petición GET al archivo JSON en S3
    this.http.get<any[]>(this.s3Url).subscribe(
      (users) => {
        const user = users.find((u) => u.email === email);

        if (user) {
          alert(`La clave es: ${user.password}`);
        } else {
          alert('El correo no está registrado.');
        }
      },
      (error) => {
        console.error('Error al acceder al archivo JSON:', error);
        alert('Hubo un problema al intentar recuperar la contraseña. Por favor, inténtalo más tarde.');
      }
    );
  }
}

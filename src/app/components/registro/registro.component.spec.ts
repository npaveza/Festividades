import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroComponent } from './registro.component';

describe('RegistroComponent', () => {
    let component: RegistroComponent;
    let fixture: ComponentFixture<RegistroComponent>;
    let routerSpy: jasmine.SpyObj<Router>;

    // Configuración inicial del entorno de pruebas
    beforeEach(async () => {
        // Crear un spy para el Router
        const spy = jasmine.createSpyObj('Router', ['navigate']);

        // Configurar el módulo de pruebas
        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, FormsModule, RegistroComponent], // Importar RegistroComponent como standalone
            providers: [
                { provide: Router, useValue: spy }
            ]
        }).compileComponents();

        // Inyectar el spy del Router
        routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    });

    // Configuración antes de cada prueba
    beforeEach(() => {
        // Crear una instancia del componente
        fixture = TestBed.createComponent(RegistroComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        // Limpiar localStorage antes de cada prueba
        localStorage.clear();
    });

    // Prueba de creación del componente
    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    // Prueba de inicialización del formulario
    it('should initialize the form with empty fields', () => {
        expect(component.registroForm).toBeTruthy();
        expect(component.registroForm.get('nombre')?.value).toBe('');
        expect(component.registroForm.get('email')?.value).toBe('');
        expect(component.registroForm.get('password')?.value).toBe('');
        expect(component.registroForm.get('confirmPassword')?.value).toBe('');
        expect(component.registroForm.get('tipoUsuario')?.value).toBe('');
    });

    // Prueba de validación de controles de formulario
    it('should validate form controls', () => {
        const nombreControl = component.registroForm.get('nombre');
        const emailControl = component.registroForm.get('email');
        const passwordControl = component.registroForm.get('password');
        const confirmPasswordControl = component.registroForm.get('confirmPassword');
        const tipoUsuarioControl = component.registroForm.get('tipoUsuario');

        // Probar validadores requeridos
        nombreControl?.setValue('');
        emailControl?.setValue('');
        passwordControl?.setValue('');
        confirmPasswordControl?.setValue('');
        tipoUsuarioControl?.setValue('');

        expect(nombreControl?.valid).toBeFalsy();
        expect(emailControl?.valid).toBeFalsy();
        expect(passwordControl?.valid).toBeFalsy();
        expect(confirmPasswordControl?.valid).toBeFalsy();
        expect(tipoUsuarioControl?.valid).toBeFalsy();

        // Probar entradas válidas
        nombreControl?.setValue('Juan Perez');
        emailControl?.setValue('juan@example.com');
        passwordControl?.setValue('Password123!');
        confirmPasswordControl?.setValue('Password123!');
        tipoUsuarioControl?.setValue('cliente');

        expect(nombreControl?.valid).toBeTruthy();
        expect(emailControl?.valid).toBeTruthy();
        expect(passwordControl?.valid).toBeTruthy();
        expect(confirmPasswordControl?.valid).toBeTruthy();
        expect(tipoUsuarioControl?.valid).toBeTruthy();
    });

    // Prueba de complejidad de contraseña
    it('should validate password complexity', () => {
        const passwordControl = component.registroForm.get('password');

        // Probar contraseñas inválidas
        const invalidPasswords = [
            'short',                 // demasiado corta
            'onlylowercase',         // sin mayúsculas
            'ONLYUPPERCASE',         // sin minúsculas
            'NoSpecialChar123',      // sin carácter especial
            'NoNumber!Password'      // sin número
        ];

        invalidPasswords.forEach(password => {
            passwordControl?.setValue(password);
            expect(passwordControl?.valid).toBeFalsy();
        });

        // Probar contraseña válida
        passwordControl?.setValue('ValidPassword123!');
        expect(passwordControl?.valid).toBeTruthy();
    });

    // Prueba de prevención de registro con contraseñas no coincidentes
    it('should prevent registration with mismatched passwords', () => {
        const alertSpy = spyOn(window, 'alert');

        component.registroForm.setValue({
            nombre: 'Juan Perez',
            email: 'juan@example.com',
            password: 'Password123!',
            confirmPassword: 'DifferentPassword123!',
            tipoUsuario: 'cliente'
        });

        component.registrar();

        expect(alertSpy).toHaveBeenCalledWith('Las contraseñas no coinciden.');
        expect(routerSpy.navigate).not.toHaveBeenCalled();
    });

    // Prueba de registro de usuario exitoso
    it('should successfully register user when form is valid', () => {
        const alertSpy = spyOn(window, 'alert');
        const localStorageSetItemSpy = spyOn(localStorage, 'setItem');

        component.registroForm.setValue({
            nombre: 'Juan Perez',
            email: 'juan@example.com',
            password: 'Password123!',
            confirmPassword: 'Password123!',
            tipoUsuario: 'cliente'
        });

        component.registrar();

        expect(alertSpy).toHaveBeenCalledWith('Usuario registrado exitosamente.');
        expect(localStorageSetItemSpy).toHaveBeenCalled();
        expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
    });

    // Prueba de no registro cuando el formulario es inválido
    it('should not register when form is invalid', () => {
        const alertSpy = spyOn(window, 'alert');
        const localStorageSetItemSpy = spyOn(localStorage, 'setItem');

        component.registroForm.setValue({
            nombre: '',
            email: 'invalid-email',
            password: 'short',
            confirmPassword: 'short',
            tipoUsuario: ''
        });

        component.registrar();

        expect(alertSpy).not.toHaveBeenCalledWith('Usuario registrado exitosamente.');
        expect(localStorageSetItemSpy).not.toHaveBeenCalled();
        expect(routerSpy.navigate).not.toHaveBeenCalled();
    });
});

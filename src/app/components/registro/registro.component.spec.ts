import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroComponent } from './registro.component';

describe('RegistroComponent', () => {
    let component: RegistroComponent;
    let fixture: ComponentFixture<RegistroComponent>;
    let httpMock: HttpTestingController;
    let mockRouter: jasmine.SpyObj<Router>;

    beforeEach(async () => {
        mockRouter = jasmine.createSpyObj('Router', ['navigate']);

        await TestBed.configureTestingModule({
            declarations: [RegistroComponent],
            imports: [ReactiveFormsModule, HttpClientTestingModule],
            providers: [
                { provide: Router, useValue: mockRouter },
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RegistroComponent);
        component = fixture.componentInstance;
        httpMock = TestBed.inject(HttpTestingController);
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should show error when email already exists in JSON', () => {
        const mockUsers = [
            { email: 'existing@example.com', password: 'Password123!', tipoUsuario: 'user' }
        ];

        // Set form values
        component.registroForm.setValue({
            nombre: 'New User',
            email: 'existing@example.com',
            password: 'Password123!',
            confirmPassword: 'Password123!',
            tipoUsuario: 'user'
        });

        component.registrar();

        // Expect the HTTP GET request to be made to the correct URL
        const req = httpMock.expectOne('https://fsiinpavez.s3.us-east-1.amazonaws.com/usuario.json');
        expect(req.request.method).toBe('GET');
        req.flush(mockUsers); // Mock response with existing users

        // Expect the error message to be displayed
        expect(component.errorMessage).toBe('Este correo ya está registrado.');
        httpMock.verify();
    });

    it('should register user successfully when data is valid', () => {
        const mockUsers = [
            { email: 'existing@example.com', password: 'Password123!', tipoUsuario: 'user' }
        ];

        // Set form values
        component.registroForm.setValue({
            nombre: 'New User',
            email: 'newuser@example.com',
            password: 'Password123!',
            confirmPassword: 'Password123!',
            tipoUsuario: 'user'
        });

        component.registrar();

        const req = httpMock.expectOne('https://fsiinpavez.s3.us-east-1.amazonaws.com/usuario.json');
        expect(req.request.method).toBe('GET');
        req.flush(mockUsers); // Mock response with existing users

        // Mock the PUT request for saving the new user
        const putReq = httpMock.expectOne('https://fsiinpavez.s3.us-east-1.amazonaws.com/usuario.json');
        expect(putReq.request.method).toBe('PUT');
        expect(putReq.request.body).toEqual([...mockUsers, component.registroForm.value]);
        putReq.flush({});

        // Check if success message is shown
        expect(component.successMessage).toBe('Usuario registrado exitosamente.');
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
        httpMock.verify();
    });

    it('should show error when passwords do not match', () => {
        component.registroForm.setValue({
            nombre: 'New User',
            email: 'newuser@example.com',
            password: 'Password123!',
            confirmPassword: 'DifferentPassword123!',
            tipoUsuario: 'user'
        });

        component.registrar();

        expect(component.errorMessage).toBe('Las contraseñas no coinciden.');
    });

    it('should show error when form is invalid', () => {
        component.registroForm.setValue({
            nombre: '',
            email: 'newuser@example.com',
            password: 'Password123!',
            confirmPassword: 'Password123!',
            tipoUsuario: 'user'
        });

        component.registrar();

        expect(component.errorMessage).toBe('Por favor, completa todos los campos correctamente.');
    });

    afterEach(() => {
        httpMock.verify();
    });
});

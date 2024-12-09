import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AgregarEventoComponent } from './agregar-evento.component';

describe('AgregarEventoComponent', () => {
  let component: AgregarEventoComponent;
  let fixture: ComponentFixture<AgregarEventoComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      declarations: [AgregarEventoComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarEventoComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debería restablecer el formulario después de agregar un evento', (done) => {
    // Establecer valores iniciales del formulario
    component.eventoForm.patchValue({
      nombre: 'Evento de prueba',
      lugar: 'Lugar de prueba',
      fecha: '2024-12-15',
      hora: '18:00',
      puestos: 50,
      entrada: 10,
      estacionamiento: true,
    });

    // Activar el método para agregar evento
    component.agregarEvento();

    // Esperar la solicitud GET
    const getReq = httpMock.expectOne('https://fsiinpavez.s3.us-east-1.amazonaws.com/evento.json');
    expect(getReq.request.method).toBe('GET');
    getReq.flush([]); // Simular respuesta vacía

    // Esperar la solicitud PUT
    const putReq = httpMock.expectOne('https://fsiinpavez.s3.us-east-1.amazonaws.com/evento.json');
    expect(putReq.request.method).toBe('PUT');
    putReq.flush([]); // Simular respuesta exitosa

    // Asegurarse de que las operaciones asincrónicas se completen antes de verificar el estado
    setTimeout(() => {
      // Verificar que el formulario se haya restablecido
      expect(component.eventoForm.value).toEqual({
        nombre: '',
        lugar: '',
        fecha: '',
        hora: '',
        puestos: '',
        entrada: 0,
        estacionamiento: false,
      });
      done(); // Llamar a done() para indicar que la prueba ha finalizado
    }, 0); // Establecer un tiempo mínimo para esperar
  });

  // Prueba simple de creación del componente
  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });
});

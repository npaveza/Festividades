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
        HttpClientTestingModule,
        AgregarEventoComponent, // Importa el componente standalone aquí
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarEventoComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya solicitudes pendientes
  });

  xit('debería restablecer el formulario después de agregar un evento', (done) => {
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

    // Ejecutar el método para agregar evento
    component.agregarEvento();

    // Simular la respuesta del servidor para la solicitud GET
    const getReq = httpMock.expectOne('https://fsiinpavez.s3.us-east-1.amazonaws.com/evento.json');
    expect(getReq.request.method).toBe('GET');
    getReq.flush([]); // Respuesta vacía para inicializar eventos

    // Simular la respuesta del servidor para la solicitud PUT
    const putReq = httpMock.expectOne('https://fsiinpavez.s3.us-east-1.amazonaws.com/evento.json');
    expect(putReq.request.method).toBe('PUT');
    putReq.flush([]); // Respuesta exitosa para guardar el evento

    // Esperar que todas las operaciones asíncronas se completen
    fixture.whenStable().then(() => {
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
      done(); // Indicar que la prueba ha finalizado
    });
  });

  // Prueba simple de creación del componente
  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });
});

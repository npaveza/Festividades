import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEventoComponent } from './agregar-evento.component';


describe('AgregarEventoComponent', () => {
  let component: AgregarEventoComponent;
  let fixture: ComponentFixture<AgregarEventoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarEventoComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AgregarEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el formulario con valores predeterminados', () => {
    const form = component.eventoForm;
    expect(form).toBeTruthy();
    expect(form.get('nombre')?.value).toBe('');
    expect(form.get('lugar')?.value).toBe('');
    expect(form.get('fecha')?.value).toBe('');
    expect(form.get('hora')?.value).toBe('');
    expect(form.get('puestos')?.value).toBe('');
    expect(form.get('entrada')?.value).toBe(0);
    expect(form.get('estacionamiento')?.value).toBe(false);
  });

  it('debería invalidar el formulario si faltan campos obligatorios', () => {
    component.eventoForm.patchValue({
      nombre: '',
      lugar: '',
      fecha: '',
      hora: '',
    });

    expect(component.eventoForm.valid).toBeFalse();
  });

  it('debería validar el formulario si todos los campos obligatorios están llenos', () => {
    component.eventoForm.patchValue({
      nombre: 'Evento de prueba',
      lugar: 'Lugar de prueba',
      fecha: '2024-12-12',
      hora: '12:00',
    });

    expect(component.eventoForm.valid).toBeTrue();
  });

  it('debería agregar un evento al LocalStorage si el formulario es válido', () => {
    const mockEvento = {
      nombre: 'Evento de prueba',
      lugar: 'Lugar de prueba',
      fecha: '2024-12-12',
      hora: '12:00',
      puestos: 'A,B,C',
      entrada: 1000,
      estacionamiento: true,
    };

    // Poner valores válidos en el formulario
    component.eventoForm.patchValue(mockEvento);

    // Espía para comprobar el LocalStorage
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.returnValue('[]');
    spyOn(window, 'alert');

    component.agregarEvento();

    // Comprobar que el formulario se haya reiniciado
    expect(component.eventoForm.value).toEqual({
      nombre: '',
      lugar: '',
      fecha: '',
      hora: '',
      puestos: '',
      entrada: 0,
      estacionamiento: false,
    });

    // Comprobar que se haya guardado en LocalStorage
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'eventos',
      jasmine.stringMatching('"nombre":"Evento de prueba"')
    );

    // Comprobar que se haya mostrado la alerta
    expect(window.alert).toHaveBeenCalledWith('Evento agregado correctamente');
  });

  it('debería mostrar un mensaje de alerta si el formulario no es válido', () => {
    spyOn(window, 'alert');

    // El formulario se inicializa vacío, por lo que es inválido
    component.agregarEvento();

    // Comprobar que se muestra la alerta de error
    expect(window.alert).toHaveBeenCalledWith('Por favor, completa todos los campos obligatorios.');
  });
});
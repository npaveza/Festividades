import { Routes } from '@angular/router';
import { AgregarEventoComponent } from './components/agregar-evento/agregar-evento.component';
import { EventoDetalleComponent } from './components/evento-detalle/evento-detalle.component';
import { IndexComponent } from './components/index/index.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RecuperaPasswordComponent } from './components/recupera-password/recupera-password.component';
import { RegistroComponent } from './components/registro/registro.component';
import { VerEventosComponent } from './components/ver-eventos/ver-eventos.component';


export const routes: Routes = [
    {path: 'index', component: IndexComponent},
    {path: 'agregar-evento', component: AgregarEventoComponent},
    {path: 'ver-eventos', component: VerEventosComponent},
    {path: 'login', component: LoginComponent},
    {path: 'navbar', component: NavbarComponent},
    {path: 'recupera-password', component: RecuperaPasswordComponent},
    {path: 'registro', component: RegistroComponent},
    {path: 'evento-detalle', component: EventoDetalleComponent},
    {path: '',
    redirectTo: 'index',
    pathMatch: 'full'
}
];

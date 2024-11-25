import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarEventoComponent } from './components/agregar-evento/agregar-evento.component';
import { EventoDetalleComponent } from './components/evento-detalle/evento-detalle.component';
import { IndexComponent } from './components/index/index.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RecuperaPasswordComponent } from './components/recupera-password/recupera-password.component';
import { RegistroComponent } from './components/registro/registro.component';
import { VerEventosComponent } from './components/ver-eventos/ver-eventos.component';
import { AuthGuard } from './guards/auth.guard';


export const routes: Routes = [
    { path: '', component: LandingPageComponent },
    { path: 'login', component: LoginComponent },
    { path: 'navbar', component: NavbarComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'recupera-password', component: RecuperaPasswordComponent },
    { path: 'index', component: IndexComponent, canActivate: [AuthGuard] },
    { path: 'agregar-evento', component: AgregarEventoComponent, canActivate: [AuthGuard] },
    { path: 'ver-eventos', component: VerEventosComponent, canActivate: [AuthGuard] },
    { path: 'evento-detalle/:id', component: EventoDetalleComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
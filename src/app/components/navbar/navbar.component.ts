import { CommonModule } from '@angular/common';
import { Component, importProvidersFrom, OnInit } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';

bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom(CommonModule)],
});

interface User {
  role: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent implements OnInit {
  user: User | null = null;

  ngOnInit(): void {
    // Carga el usuario desde localStorage
    const userData = localStorage.getItem('loggedInUser');
    this.user = userData ? JSON.parse(userData) : null;
  }

  constructor(private router: Router) {}

  logout(): void {
    // Elimina el usuario de localStorage y refresca la página
    localStorage.removeItem('loggedInUser');
    this.user = null;
    this.router.navigate(['/index']); // o usa el router para redirigir
  }
}

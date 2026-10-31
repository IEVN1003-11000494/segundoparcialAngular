import { AlumnosUtl } from '../alumnosUTL';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProyectoapiService } from '../alumnosapi.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AlumnoFilterPipe } from '../alumnos-filter.pipe';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [FormsModule, RouterLink, AlumnoFilterPipe, CommonModule],
  selector: 'app-alumnos',
  templateUrl: './alumnos.html',
})
export class Alumnos implements OnInit {

  listFilter: string = '';
  alumnoTitle!: string;
  dataSource: AlumnosUtl[] = [];

  constructor(public alumnosUtl: ProyectoapiService, private router: Router) { }

  alumnosIric: AlumnosUtl[] = [
    {
      matricula: 1234,
      nombre: 'pedro',
      apaterno: 'muñoz',
      amaterno:'garcia',
      correo: 'pedro@gmail.com'
    }
  ];

  ngOnInit(): void {
    this.cargarAlumnos();
  }

  cargarAlumnos(): void {
    this.alumnosUtl.getAlumnos().subscribe({
      next: (response: AlumnosUtl[]) => {
        console.log('Datos recibidos del API:', response);
        this.dataSource = (response as any).alumnos;
      },
      error: (error) => {
        console.error('Error al consultar el API:', error);
      },
      complete: () => {
        console.log('Carga de alumnos finalizada');
      }
    });
  }
}
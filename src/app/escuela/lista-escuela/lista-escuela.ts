import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IAlumno } from '../alumno';
import { CommonModule } from '@angular/common';
 
@Component({
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  selector: 'app-lista-escuela',
  styleUrl: './lista-escuela.css',
  templateUrl: './lista-escuela.html',
})
export class ListaEscuela {
  formulario!: FormGroup;
  alumnos: IAlumno[] = [];
  indiceEdicion: number = -1;
 
  nuevoAlumno: IAlumno = {
    matricula: '',
    nombre: '',
    correo: '',
    materia: '',
  };
 
  ngOnInit(): void {
    this.cargarAlumnos();
    this.formulario = new FormGroup({
      matricula: new FormControl(''),
      nombre: new FormControl(''),
      correo: new FormControl(''),
      materia: new FormControl(''),
    });
  }

  agregarAlumno(): void {
    if (
      this.nuevoAlumno.matricula === '' ||
      this.nuevoAlumno.nombre === '' ||
      this.nuevoAlumno.correo === '' ||
      this.nuevoAlumno.materia === ''
    ) {
      alert('Todos los Campos son Obligatorios');
      return;
    }

    if (this.indiceEdicion !== -1) {
      this.alumnos[this.indiceEdicion] = {
        ...this.nuevoAlumno
      };
    } else {
      this.alumnos.push({ ...this.nuevoAlumno });
    }
 
    localStorage.setItem(
      'alumnos',
      JSON.stringify(this.alumnos)
    );


    this.limpiarCampos();
  }

  limpiarCampos(): void {
    this.nuevoAlumno = {
      matricula: '',
      nombre: '',
      correo: '',
      materia: ''
    };
    this.formulario.patchValue({
      matricula: this.nuevoAlumno.matricula,
      nombre: this.nuevoAlumno.nombre,
      correo: this.nuevoAlumno.correo,
      materia: this.nuevoAlumno.materia
    });
    this.indiceEdicion = -1;
  }

  muestraAlumno(): void {
    this.nuevoAlumno.matricula = this.formulario.value.matricula;
    this.nuevoAlumno.nombre = this.formulario.value.nombre;
    this.nuevoAlumno.correo = this.formulario.value.correo;
    this.nuevoAlumno.materia = this.formulario.value.materia;
    this.agregarAlumno();
  }
 
  cargarAlumnos(): void {
    const datos = localStorage.getItem('alumnos');
    if (datos) {
      this.alumnos = JSON.parse(datos);
    }
  }

  eliminarAlumno(index: number): void {
    this.alumnos.splice(index, 1);
    localStorage.setItem(
      'alumnos',
      JSON.stringify(this.alumnos)
    );
  }

  editarAlumno(index: number): void {
    this.nuevoAlumno = {
      ...this.alumnos[index]
    };
    const alumno = this.alumnos[index];
    this.formulario.patchValue({
      matricula: alumno.matricula,
      nombre: alumno.nombre,
      correo: alumno.correo,
      materia: alumno.materia
    });
    this.indiceEdicion = index;
  }
}
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ITicket } from '../ticket';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  selector: 'app-ventas',
  templateUrl: './ventas.html',
})
export class VentasComponent implements OnInit {
  formulario!: FormGroup;
  ventas: ITicket[] = [];
  indiceEdicion: number = -1;

  nuevoTicket: ITicket = {
    nombreComprador: '',
    maxBoletasPermitidas: 0,
    totalPagar: 0,
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.cargarVentas();
    this.formulario = new FormGroup({
      nombreComprador: new FormControl(''),
      maxBoletasPermitidas: new FormControl(0),
      totalPagar: new FormControl(0),
    });
  }

  cargarVentas(): void {
    const datos = localStorage.getItem('ventas');
    if (datos) {
      this.ventas = JSON.parse(datos);
    }
  }

  muestraVenta(): void {
    this.nuevoTicket.nombreComprador = this.formulario.value.nombreComprador;
    this.nuevoTicket.maxBoletasPermitidas = this.formulario.value.maxBoletasPermitidas;
    this.nuevoTicket.totalPagar = this.formulario.value.totalPagar;
    this.agregarVenta();
  }

  agregarVenta(): void {
    if (
      !this.nuevoTicket.nombreComprador ||
      this.nuevoTicket.nombreComprador.trim() === '' ||
      this.nuevoTicket.maxBoletasPermitidas <= 0 ||
      this.nuevoTicket.totalPagar <= 0
    ) {
      alert('Todos los campos son obligatorios y deben ser mayores a 0');
      return;
    }

    if (this.indiceEdicion !== -1) {
      this.ventas[this.indiceEdicion] = {
        ...this.nuevoTicket
      };
    } else {
      this.ventas.push({ ...this.nuevoTicket });
    }

    localStorage.setItem(
      'ventas',
      JSON.stringify(this.ventas)
    );

    this.limpiarCampos();
  }

  limpiarCampos(): void {
    this.nuevoTicket = {
      nombreComprador: '',
      maxBoletasPermitidas: 0,
      totalPagar: 0,
    };
    this.formulario.patchValue({
      nombreComprador: this.nuevoTicket.nombreComprador,
      maxBoletasPermitidas: this.nuevoTicket.maxBoletasPermitidas,
      totalPagar: this.nuevoTicket.totalPagar,
    });
    this.indiceEdicion = -1;
  }

  eliminarVenta(index: number): void {
    this.ventas.splice(index, 1);
    localStorage.setItem(
      'ventas',
      JSON.stringify(this.ventas)
    );
  }

  editarVenta(index: number): void {
    this.nuevoTicket = {
      ...this.ventas[index]
    };
    const venta = this.ventas[index];
    this.formulario.patchValue({
      nombreComprador: venta.nombreComprador,
      maxBoletasPermitidas: venta.maxBoletasPermitidas,
      totalPagar: venta.totalPagar,
    });
    this.indiceEdicion = index;
  }

  regresar(): void {
    this.router.navigate(['/escuela/cinepolis']);
  }
}
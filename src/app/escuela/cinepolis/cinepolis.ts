import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ITicket } from '../ticket';
import { Router } from '@angular/router'; 

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  selector: 'app-cinepolis',
  styleUrl: './cinepolis.css',
  templateUrl: './cinepolis.html',
})
export class Cinepolis implements OnInit {
  formulario!: FormGroup;
  mensajeError: string = '';
  ventas: ITicket[] = [];

  nuevoTicket: ITicket = {
    nombreComprador: '',
    totalPagar: 0,
    maxBoletasPermitidas: 0,
  };

  constructor(private router: Router) {}

  cargarVentas(): void {
    const datos = localStorage.getItem('ventas');
    if (datos) {
      this.ventas = JSON.parse(datos);
    }
  }

  ngOnInit(): void {
    this.cargarVentas(); 
    this.formulario = new FormGroup({
      nombre: new FormControl(''),
      cantidadCompradores: new FormControl(1),
      tarjetaCineco: new FormControl('No'),
      cantidadBoletas: new FormControl(1),
    });
  }

  procesar(): void {
    this.mensajeError = '';
    
    this.nuevoTicket = {
      nombreComprador: '',
      totalPagar: 0,
      maxBoletasPermitidas: 0
    };

    const nombre = this.formulario.value.nombre;
    const cantidadCompradores = this.formulario.value.cantidadCompradores;
    const cantidadBoletas = this.formulario.value.cantidadBoletas;
    const tarjetaCineco = this.formulario.value.tarjetaCineco;

    
    if (!nombre || nombre.trim() === '' || !cantidadCompradores || cantidadCompradores <= 0 || !cantidadBoletas || cantidadBoletas <= 0) {
      this.mensajeError = 'Error: Todos los campos son obligatorios. Ingresa un nombre y cantidades válidas.';
      return; 
    }

    const maxBoletas = cantidadCompradores * 7;

    if (cantidadBoletas > maxBoletas) {
      this.mensajeError = `Error: El límite para ${cantidadCompradores} comprador(es) es de ${maxBoletas} boletas.`;
      return; 
    }

    let total = cantidadBoletas * 12;

    if (cantidadBoletas > 5) {
      total = total * 0.85; 
    } else if (cantidadBoletas >= 3 && cantidadBoletas <= 5) {
      total = total * 0.90; 
    }

    if (tarjetaCineco === 'Si') {
      total = total * 0.90; 
    }

    this.nuevoTicket.nombreComprador = nombre;
    this.nuevoTicket.totalPagar = total;
    this.nuevoTicket.maxBoletasPermitidas = cantidadBoletas;
  }

  registrarVenta(): void {
    this.procesar();

    
    if (this.mensajeError === '' && this.nuevoTicket.totalPagar > 0) {
      this.ventas.push({ ...this.nuevoTicket });
      localStorage.setItem('ventas', JSON.stringify(this.ventas));
      
      this.router.navigate(['/escuela/ventas']);
    }
  }

  salir(): void {
    this.formulario.reset({
      nombre: '',
      cantidadCompradores: 1,
      tarjetaCineco: 'No',
      cantidadBoletas: 1
    });
    this.mensajeError = '';
    this.nuevoTicket = {
      nombreComprador: '',
      totalPagar: 0,
      maxBoletasPermitidas: 0
    };
  }
}
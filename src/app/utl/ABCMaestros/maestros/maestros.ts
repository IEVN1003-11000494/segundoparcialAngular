import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaestrosapiService } from '../maestrosapi.service';
import { MaestrosUtl } from '../maestrosUTL';
import { MaestroFilterPipe } from '../maestros-filter.pipe';

@Component({
  selector: 'app-maestros',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, MaestroFilterPipe],
  templateUrl: './maestros.html'
})
export class Maestros implements OnInit {
  
  listFilter: string = '';
  dataSource: MaestrosUtl[] = [];

  constructor(public maestrosApi: MaestrosapiService) { }

  ngOnInit(): void {
    this.cargarMaestros();
  }

  cargarMaestros(): void {
    this.maestrosApi.getMaestros().subscribe({
      next: (response: any) => { 
        this.dataSource = (response as any).maestros ? (response as any).maestros : response;
      },
      error: (error) => {
        console.error('Error al consultar el API de maestros:', error);
      }
    });
  }
}
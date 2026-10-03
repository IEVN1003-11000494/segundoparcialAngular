import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { ZodiacoComponent } from './Formulario/zodiaco/zodiaco';
import { Navbar } from './navbar/navbar';
import { Distancia } from './Formulario/distancia/distancia';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ZodiacoComponent, Navbar, Distancia, RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  title = 'web-app';

  ngOnInit(): void {
    initFlowbite();
  }
}

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-zodiaco',
  templateUrl: './zodiaco.html',
  styleUrls: ['./zodiaco.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class ZodiacoComponent {
  nombre: string = '';
  apaterno: string = '';
  amaterno: string = '';
  dia: number = 0;
  mes: number = 0;
  anio: number = 0;
  sexo: string = '';

  imprimir: boolean = false;
  errorFecha: boolean = false;
  nombreCompleto: string = '';
  edad: number = 0;
  signoZodiacal: string = '';
  imagenSigno: string = '';

  imprimirDatos(): void {
    let fechaHoy = new Date();
    let anioActual = fechaHoy.getFullYear();
    let mesActual = fechaHoy.getMonth() + 1; 
    let diaActual = fechaHoy.getDate();

    
    if (this.anio > anioActual) {
      this.errorFecha = true;
      this.imprimir = false;
      return; 
    } 
    else if (this.anio === anioActual && this.mes > mesActual) {
      this.errorFecha = true;
      this.imprimir = false;
      return;
    } 
    else if (this.anio === anioActual && this.mes === mesActual && this.dia > diaActual) {
      this.errorFecha = true;
      this.imprimir = false;
      return;
    }

  
    this.errorFecha = false;

    this.nombreCompleto = this.nombre + ' ' + this.apaterno + ' ' + this.amaterno;
    
    if (this.anio === 0) {
      this.edad = 0;
    } else {
      this.edad = anioActual - this.anio;

      if (mesActual < this.mes) {
        this.edad = this.edad - 1;
      } 
      else if (mesActual === this.mes && diaActual < this.dia) {
        this.edad = this.edad - 1;
      }
    }

    let residuo = this.anio % 12;

    if (residuo === 0) {
      this.signoZodiacal = 'Mono';
      this.imagenSigno = 'https://peopleenespanol.com/thmb/8VWhfhMpai7ORO6tE7uvT0ZGLTQ=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Horoscopo-chino-165967347-2000-141e78d49c344d73a216c09df52f7fcb.jpg';
    } 
    else if (residuo === 1) {
      this.signoZodiacal = 'Gallo';
      this.imagenSigno = 'https://peopleenespanol.com/thmb/dYkLzX9Pe-PUUGS4QWMGPVRJEsA=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Horoscopo-chino-165926089-2000-25a52aba2d0942679de98ba836f1ab9f.jpg';
    } 
    else if (residuo === 2) {
      this.signoZodiacal = 'Perro';
      this.imagenSigno = 'https://studycli.org/wp-content/uploads/2021/06/chinese-new-year-year-of-the-dog-paper-cutting.jpeg.webp';
    } 
    else if (residuo === 3) {
      this.signoZodiacal = 'Cerdo';
      this.imagenSigno = 'https://peopleenespanol.com/thmb/JlnropInvxmvgdTvwX4WSToXmFs=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Horoscopo-chino-165969332-2000-eea5e27d3f4145c9b01121f4c61ccaef.jpg';
    } 
    else if (residuo === 4) {
      this.signoZodiacal = 'Rata';
      this.imagenSigno = 'https://peopleenespanol.com/thmb/_1OgeiL_qPw-PDN3P4W4G8AAYsk=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Horoscopo-chino-165967831-2000-0b5df0ef22b14788998815d899e6a97f.jpg';
    } 
    else if (residuo === 5) {
      this.signoZodiacal = 'Buey';
      this.imagenSigno = 'https://peopleenespanol.com/thmb/3b5OFomDNAG4HOc-xgkywdaFoEU=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Horoscopo-chino-165942187-2000-f810031b206d4fa7b64e5f8ad9f2bedd.jpg';
    } 
    else if (residuo === 6) {
      this.signoZodiacal = 'Tigre';
      this.imagenSigno = 'https://peopleenespanol.com/thmb/Xo7lcQCKPDiCT0WjU7XieSiy_SU=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Horoscopo-chino-165965551-2000-c9be7d6705b84cf99cdc8b32126e32bb.jpg';
    } 
    else if (residuo === 7) {
      this.signoZodiacal = 'Conejo';
      this.imagenSigno = 'https://peopleenespanol.com/thmb/YHGXsbH_14NccNN-YAb08oNQ57E=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Horoscopo-chino-165927323-2000-c6361314aab74b7485a5ea677666ba83.jpg';
    } 
    else if (residuo === 8) {
      this.signoZodiacal = 'Dragón';
      this.imagenSigno = 'https://peopleenespanol.com/thmb/3qq9XYUUJV4SnNeyV_TyKnC2iVA=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Horoscopo-chino-165942305-2000-8fe379790e0e4ccba8ea80e33697647e.jpg';
    } 
    else if (residuo === 9) {
      this.signoZodiacal = 'Serpiente';
      this.imagenSigno = 'https://peopleenespanol.com/thmb/by99T6NBm8FNbp890x9qSeQ6v3k=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Horoscopo-chino-165965553-2000-e4700b87c9fd404681a502f7095c2ac5.jpg';
    } 
    else if (residuo === 10) {
      this.signoZodiacal = 'Caballo';
      this.imagenSigno = 'https://peopleenespanol.com/thmb/X_hW3ps1TJ0U31lk2BfMiZyyi6g=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Horoscopo-chino-165967001-2000-57bb5c0eac9247e4a6b9afe14505f364.jpg';
    } 
    else if (residuo === 11) {
      this.signoZodiacal = 'Cabra';
      this.imagenSigno = 'https://peopleenespanol.com/thmb/qTi7W1BzCQmhhgJ0xpRqk2n8890=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Horoscopo-chino-165967741-2000-12afb4d370f14afe856f05ba36fe1693.jpg';
    }

    this.imprimir = true;
  }
}
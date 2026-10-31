import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maestroFilter',
  standalone: true
})
export class MaestroFilterPipe implements PipeTransform {
  transform(value: any, args: any): any {
    if (!value) return [];
    
    if (!args || args.toString().trim() === '') {
        return value;
    }

    const filtro = args.toString().toLowerCase().trim();
    return value.filter((maestro: any) => 
        maestro.nombre && maestro.nombre.toLowerCase().includes(filtro)
    );
  }
}
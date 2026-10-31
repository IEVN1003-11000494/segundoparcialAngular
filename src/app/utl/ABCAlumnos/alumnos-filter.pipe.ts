import { Pipe, PipeTransform } from '@angular/core';
import { AlumnosUtl } from './alumnosUTL';

@Pipe({
  name: 'alumnoFilter',
  standalone: true
})
export class AlumnoFilterPipe implements PipeTransform {
  transform(value: AlumnosUtl[], args: string): AlumnosUtl[] {
    // 1. Si los datos aún no llegan de la base de datos, no hace nada
    if (!value) return [];

    // 2. Transforma lo que escribes a minúsculas para evitar errores
    let filter: string = args ? args.toLocaleLowerCase() : '';

    // 3. Si hay filtro, busca coincidencias. Si está vacío, regresa TODOS los registros
    return filter ? value.filter((alumno: AlumnosUtl) =>
      alumno.nombre.toLocaleLowerCase().includes(filter)
    ) : value;
  }
}
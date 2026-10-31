import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MaestrosUtl } from './maestrosUTL';

@Injectable({
  providedIn: 'root'
})
export class MaestrosapiService {
  constructor(private http: HttpClient) { }

  public getMaestros(): Observable<MaestrosUtl[]> {
    return this.http.get<MaestrosUtl[]>('http://127.0.0.1:5001/api/maestros/');
  }
}
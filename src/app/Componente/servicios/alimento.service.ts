// src/app/services/alimento.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alimento } from '../Modelo/Alimento'; // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root'
})
export class alimentoService {

  private baseUrl: string = 'http://localhost:9000/api/alimentos'; // Cambia la URL según sea necesario

  constructor(private http: HttpClient) { }

  // Crear un nuevo alimento
  crearAlimento(alimento: Alimento): Observable<Alimento> {
    return this.http.post<Alimento>(this.baseUrl, alimento);
  }

  // Obtener todos los alimentos
  obtenerTodosLosAlimentos(): Observable<Alimento[]> {
    return this.http.get<Alimento[]>(this.baseUrl);
  }

  // Obtener alimento por ID
  obtenerAlimentoPorId(id: number): Observable<Alimento> {
    return this.http.get<Alimento>(`${this.baseUrl}/${id}`);
  }

  // Actualizar un alimento por ID
  actualizarAlimento(id: number, alimento: Alimento): Observable<Alimento> {
    return this.http.put<Alimento>(`${this.baseUrl}/${id}`, alimento);
  }

  // Eliminar un alimento por ID
  eliminarAlimento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Obtener alimentos por proveedor (empresa)
  obtenerAlimentosPorProveedor(empresa: string): Observable<Alimento[]> {
    return this.http.get<Alimento[]>(`${this.baseUrl}/proveedor/${empresa}`);
  }

  // Obtener alimentos por tipo
  obtenerAlimentosPorTipo(tipo: string): Observable<Alimento[]> {
    return this.http.get<Alimento[]>(`${this.baseUrl}/tipo/${tipo}`);
  }
}

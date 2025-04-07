import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alimento } from '../Modelo/Alimento';

@Injectable({
  providedIn: 'root'
})
export class AlimentoService {

  private apiUrl = `http://localhost:9000/aa`; // ← corregido

  constructor(private http: HttpClient) { }

  // Obtener todos los alimentos
  getAlimentos(): Observable<Alimento[]> {
    return this.http.get<Alimento[]>(this.apiUrl);
  }

  // Obtener un alimento por ID
  getAlimentoById(id: number): Observable<Alimento> {
    return this.http.get<Alimento>(`${this.apiUrl}/${id}`);
  }

  // Guardar un nuevo alimento
  guardarAlimento(alimento: Alimento, cantidad: number, unidadMedida: string): Observable<Alimento> {
    const params = new HttpParams()
      .set('cantidad', cantidad.toString())
      .set('unidadMedida', unidadMedida);
    return this.http.post<Alimento>(this.apiUrl, alimento, { params });
  }

  // Actualizar un alimento
  actualizarAlimento(id: number, alimento: Alimento): Observable<Alimento> {
    return this.http.put<Alimento>(`${this.apiUrl}/${id}`, alimento);
  }

  // Eliminar un alimento
  eliminarAlimento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Agregar stock por nombre
  agregarStockPorNombre(nombre: string, cantidad: number, unidadMedida: string): Observable<Alimento> {
    const params = new HttpParams()
      .set('nombre', nombre)
      .set('cantidad', cantidad.toString())
      .set('unidadMedida', unidadMedida);
    return this.http.patch<Alimento>(`${this.apiUrl}/agregar-stock`, {}, { params });
  }

  // Actualizar stock por ID
  actualizarStockPorId(id: number, cantidad: number, unidadMedida: string): Observable<Alimento> {
    const params = new HttpParams()
      .set('cantidad', cantidad.toString())
      .set('unidadMedida', unidadMedida);
    return this.http.patch<Alimento>(`${this.apiUrl}/${id}/stock`, {}, { params });
  }
}

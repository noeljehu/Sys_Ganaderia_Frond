import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Alimento } from '../Modelo/Alimento';

@Injectable({
  providedIn: 'root'
})
export class AlimentoService {

  private apiUrl = 'http://localhost:9000/api/alimentos'; // URL base para los alimentos

  constructor(private http: HttpClient) { }

  // Obtener todos los alimentos
  obtenerTodosLosAlimentos(): Observable<Alimento[]> {
    return this.http.get<Alimento[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Obtener un alimento por ID
  obtenerAlimentoPorId(id: number): Observable<Alimento> {
    return this.http.get<Alimento>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Guardar un nuevo alimento
  guardarAlimento(alimento: Alimento): Observable<Alimento> {
    return this.http.post<Alimento>(this.apiUrl, alimento).pipe(
      catchError(this.handleError)
    );
  }

  // Actualizar un alimento
  actualizarAlimento(id: number, alimento: Alimento): Observable<Alimento> {
    return this.http.put<Alimento>(`${this.apiUrl}/${id}`, alimento).pipe(
      catchError(this.handleError)
    );
  }

  // Eliminar un alimento
  eliminarAlimento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Actualizar stock de un alimento por ID
  actualizarStock(id: number, cantidad: number, unidadMedida: string): Observable<Alimento> {
    const url = `${this.apiUrl}/${id}/stock?cantidad=${cantidad}&unidadMedida=${unidadMedida}`;
    return this.http.patch<Alimento>(url, {}).pipe(
      catchError(this.handleError)
    );
  }

  // Agregar stock a un alimento por nombre
  agregarStockPorNombre(nombre: string, cantidad: number, unidadMedida: string): Observable<Alimento> {
    const url = `${this.apiUrl}/agregarStock?nombre=${nombre}&cantidad=${cantidad}&unidadMedida=${unidadMedida}`;
    return this.http.patch<Alimento>(url, {}).pipe(
      catchError(this.handleError)
    );
  }

  // Método para manejar los errores
  private handleError(error: any): Observable<never> {
    console.error('Ocurrió un error: ', error);
    return throwError(() => new Error('Hubo un problema con la solicitud.'));
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Proveedor } from '../Modelo/proveedor.model';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  private apiUrl = 'http://localhost:9000/api/proveedores';

  constructor(private http: HttpClient) { }

  // Registrar un proveedor
  registrarProveedor(proveedor: Proveedor): Observable<Proveedor> {
    return this.http.post<Proveedor>(`${this.apiUrl}/register`, proveedor).pipe(
      catchError(this.handleError)
    );
  }

  // Manejo de errores
  private handleError(error: any) {
    console.error('Ocurrió un error:', error);
    return throwError('Algo salió mal; por favor, intente nuevamente más tarde.');
  }

  // Listar todos los proveedores
  listarProveedores(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Buscar proveedor por ID
  buscarProveedorPorId(id: number): Observable<Proveedor> {
    return this.http.get<Proveedor>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Buscar proveedor por empresa
  buscarPorEmpresa(empresa: string): Observable<Proveedor[]> {
    let params = new HttpParams().set('empresa', empresa);
    return this.http.get<Proveedor[]>(`${this.apiUrl}/buscar`, { params }).pipe(
      catchError(this.handleError)
    );
  }

  // Actualizar proveedor
  actualizarProveedor(id: number, proveedor: Proveedor): Observable<Proveedor> {
    return this.http.put<Proveedor>(`${this.apiUrl}/${id}`, proveedor).pipe(
      catchError(this.handleError)
    );
  }

  // Eliminar proveedor
  eliminarProveedor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }
}

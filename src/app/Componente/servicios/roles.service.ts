import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rol } from '../Modelo/Usuario';  // Correcta importación del modelo Rol desde Usuario.ts

@Injectable({
  providedIn: 'root'
})
export class RolService {
  private apiUrl = 'http://localhost:9000/api/roles';

  constructor(private http: HttpClient) {}

  // Obtener todos los roles
  obtenerRoles(): Observable<Rol[]> {
    return this.http.get<Rol[]>(this.apiUrl);
  }

  // Crear un nuevo rol
  crearRol(rol: Rol): Observable<Rol> {
    return this.http.post<Rol>(this.apiUrl, rol);
  }

  // Editar un rol existente
  editarRol(id: number, rol: Rol): Observable<Rol> {
    return this.http.put<Rol>(`${this.apiUrl}/${id}`, rol);
  }

  // Eliminar un rol
  eliminarRol(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}

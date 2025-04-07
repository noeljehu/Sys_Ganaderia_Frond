import { Proveedor } from "./proveedor.model";



export interface Alimento {
  id?: number;
  nombre: string;
  tipo: string;
  cantidad: number;
  unidadMedida: string;
  precioPorUnidad: number;
  precioTotal?: number;
  fechaIngreso?: string;
  observaciones?: string;
  proveedor: Proveedor;  // Aquí puedes seguir usando la estructura completa, pero solo pasas el id
  proveedorEmpresa: string;
}

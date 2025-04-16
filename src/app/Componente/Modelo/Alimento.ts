export interface Alimento {
  id: number;
  nombre: string;
  tipo: string;
  cantidad: number;
  unidadMedida: string;
  precioPorUnidad: number;
  precioTotal: number;
  fechaIngreso: string;
  observaciones: string;
  proveedor: string;
  codigoAlimento: string;
}

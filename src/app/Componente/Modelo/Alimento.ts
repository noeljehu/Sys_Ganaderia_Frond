export interface Alimento {
  id: number;                      // ID único del alimento
  codigoAlimento: string;           // Código único del alimento
  nombre: string;                   // Nombre del alimento
  tipo: string;                     // Tipo de alimento (por ejemplo, "forraje", "grano", etc.)
  cantidad: number;                 // Cantidad del alimento (en kg o toneladas)
  unidadMedida: string;             // Unidad de medida del alimento (puede ser 'kg' o 'tonelada')
  precioPorUnidad: number;          // Precio por unidad del alimento
  precioTotal: number;              // Precio total del stock actual (precioPorUnidad * cantidad)
  fechaIngreso: string;             // Fecha en que se registró el alimento
  observaciones: string;            // Observaciones adicionales
  proveedor: string;                // Información del proveedor (campo tipo string)
}

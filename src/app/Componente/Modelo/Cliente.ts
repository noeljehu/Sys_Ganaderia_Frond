export interface Cliente {
  idCliente?: number;
  CodigoCliente?: string;
  nombre: string;
  apellido: string;
  tipoDocumento: string;
  numeroDocumento: string;
  telefono: string;
  correo: string;
  direccion: string;
  fechaRegistro?: string;
}

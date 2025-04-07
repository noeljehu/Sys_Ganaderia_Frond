export interface Rol {
    id: number;
    nombre: string;
    descripcion: string;
  }
  
  export interface Usuario {
    id: number;
    nombre: string;
    correo: string;
    contrasena: string;
    telefono?: string;
    direccion?: string;
    rol: Rol;
    fechaRegistro: string;
    estado: boolean;
  }
  
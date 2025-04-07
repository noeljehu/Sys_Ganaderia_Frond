import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../servicios/usuario.service';
import { Rol, Usuario } from '../../Modelo/Usuario';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  // Usar CommonModule en lugar de BrowserModule
import { RolService } from '../../servicios/roles.service';
import Swal from 'sweetalert2';  // Importar SweetAlert2
declare var bootstrap: any; // Declarar bootstrap para evitar errores de compilación

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule],  // Usar CommonModule en lugar de BrowserModule
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})

export class UsuarioComponent implements OnInit {
  usuarios: Usuario[] = [];
  usuario: Usuario = {
    id: 0,
    nombre: '',
    correo: '',
    contrasena: '',
    rol: { id: 0, nombre: '', descripcion: '' },
    fechaRegistro: '',
    estado: true
  };
  roles: Rol[] = [];
  nombreBuscado: string = '';

  constructor(private usuarioService: UsuarioService, private rolService: RolService) {}

  ngOnInit(): void {
    this.obtenerUsuarios();
    this.obtenerRoles(); // Cargar roles al iniciar el componente
  }

  obtenerRoles(): void {
    this.rolService.obtenerRoles().subscribe(
      (roles) => {
        this.roles = roles;
      },
      (error) => {
        console.error('Error al obtener roles', error);
      }
    );
  }

  obtenerUsuarios(): void {
    this.usuarioService.listarUsuarios().subscribe(
      (usuarios) => {
        this.usuarios = usuarios;
      },
      (error) => {
        console.error('Error al obtener usuarios', error);
      }
    );
  }

  buscarPorNombre(): void {
    if (this.nombreBuscado.trim()) {
      this.usuarioService.buscarPorNombre(this.nombreBuscado).subscribe(
        (usuarios) => {
          this.usuarios = usuarios;
        },
        (error) => {
          console.error('Error al buscar usuarios', error);
        }
      );
    } else {
      this.obtenerUsuarios(); // Si no hay búsqueda, recarga todos los usuarios
    }
  }

  abrirModal(usuario?: Usuario): void {
    if (usuario) {
      // Verifica que el rol esté correctamente asignado
      this.usuario = { 
        ...usuario, 
        rol: usuario.rol || { id: 0, nombre: '', descripcion: '' } // Si no tiene rol, se asigna un rol vacío
      };
    } else {
      this.usuario = { 
        id: 0,
        nombre: '',
        correo: '',
        contrasena: '',
        rol: { id: 0, nombre: '', descripcion: '' },
        fechaRegistro: '',
        estado: true
      };
    }
  
    const modalElement = document.getElementById('modalRegistrarUsuario');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }
  

  cerrarModal(): void {
    const modalElement = document.getElementById('modalRegistrarUsuario');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }
  }

  registrarUsuario(): void {
    this.usuarioService.registrarUsuario(this.usuario).subscribe(
      
      (nuevoUsuario) => {
        console.log('Usuario registrado', nuevoUsuario);
        this.obtenerUsuarios(); // Actualiza la lista de usuarios
        this.cerrarModal(); // Cierra el modal después del registro
        
        // SweetAlert para éxito
        Swal.fire({
          icon: 'success',
          title: 'Usuario Registrado',
          text: 'El usuario se ha registrado exitosamente.',
          confirmButtonText: 'Aceptar'
        });
      },
      (error) => {
        console.error('Error al registrar usuario', error);

        // SweetAlert para error
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al registrar el usuario. Intenta nuevamente.',
          confirmButtonText: 'Aceptar'
        });
      }
    );
  }

  actualizarUsuario(): void {
    this.usuarioService.actualizarUsuario(this.usuario.id, this.usuario).subscribe(
      (usuarioActualizado) => {
        console.log('Usuario actualizado', usuarioActualizado);
        this.obtenerUsuarios(); // Actualiza la lista de usuarios
        this.cerrarModal(); // Cierra el modal después de la actualización
        
        // SweetAlert para éxito
        Swal.fire({
          icon: 'success',
          title: 'Usuario Actualizado',
          text: 'El usuario se ha actualizado exitosamente.',
          confirmButtonText: 'Aceptar'
        });
      },
      (error) => {
        console.error('Error al actualizar usuario', error);
        
        // SweetAlert para error
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al actualizar el usuario. Intenta nuevamente.',
          confirmButtonText: 'Aceptar'
        });
      }
    );
  }

  eliminarUsuario(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Este usuario será eliminado permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(id).subscribe(
          () => {
            console.log('Usuario eliminado');
            this.obtenerUsuarios(); // Actualiza la lista de usuarios
            
            // SweetAlert para éxito
            Swal.fire({
              icon: 'success',
              title: 'Usuario Eliminado',
              text: 'El usuario ha sido eliminado exitosamente.',
              confirmButtonText: 'Aceptar'
            });
          },
          (error) => {
            console.error('Error al eliminar usuario', error);
            
            // SweetAlert para error
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Hubo un error al eliminar el usuario. Intenta nuevamente.',
              confirmButtonText: 'Aceptar'
            });
          }
        );
      }
    });
  }
}

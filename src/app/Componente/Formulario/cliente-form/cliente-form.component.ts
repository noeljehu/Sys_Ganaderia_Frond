import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Cliente } from '../../Modelo/Cliente';
import { ClienteService } from '../../servicios/cliente.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

declare var bootstrap: any;

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css'],
})
export class ClienteFormComponent implements OnInit, AfterViewInit {
  nombreBuscado: string = '';
  clientes: Cliente[] = [];
  cliente: Cliente = {
    nombre: '',
    apellido: '',
    tipoDocumento: '',
    numeroDocumento: '',
    telefono: '',
    correo: '',
    direccion: '',
  };
  tiposDeDocumento: string[] = ['DNI', 'RUC', 'Pasaporte', 'Carnet de Extranjería'];

  private modalInstance: any;

  constructor(private clienteService: ClienteService) {}

  ngAfterViewInit(): void {
    // Inicializar la instancia del modal después de que la vista esté completamente cargada
    this.modalInstance = new bootstrap.Modal(document.getElementById('clienteModal'));
  }

  ngOnInit(): void {
    this.obtenerClientes();
  }

  obtenerClientes(): void {
    this.clienteService.obtenerClientes().subscribe((data) => {
      this.clientes = data;
    });
  }

  buscarPorNombre(): void {
    if (this.nombreBuscado) {
      this.clientes = this.clientes.filter(cliente =>
        cliente.nombre.toLowerCase().includes(this.nombreBuscado.toLowerCase())
      );
    } else {
      this.obtenerClientes();
    }
  }

  // Crear cliente con confirmación
  crearCliente(): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres crear este cliente?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, crear',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        delete this.cliente.idCliente;
        delete this.cliente.CodigoCliente;
        this.clienteService.crearCliente(this.cliente).subscribe({
          next: (nuevoCliente) => {
            this.clientes.push(nuevoCliente);
            this.cerrarModal();
            this.resetCliente();
            // SweetAlert de éxito
            Swal.fire({
              icon: 'success',
              title: 'Cliente creado exitosamente',
              text: 'El cliente ha sido creado con éxito.',
            });
          },
          error: (err) => {
            console.error('Error al crear cliente: ', err);
            // SweetAlert de error
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Hubo un problema al crear el cliente.',
            });
          },
        });
      }
    });
  }

  // Actualizar cliente con confirmación
  actualizarCliente(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres actualizar este cliente?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, actualizar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.actualizarCliente(id, this.cliente).subscribe((clienteActualizado) => {
          const index = this.clientes.findIndex(c => c.idCliente === id);
          if (index !== -1) this.clientes[index] = clienteActualizado;
          this.cerrarModal();
          // SweetAlert de éxito
          Swal.fire({
            icon: 'success',
            title: 'Cliente actualizado exitosamente',
            text: 'El cliente ha sido actualizado con éxito.',
          });
        });
      }
    });
  }

  // Eliminar cliente con confirmación
  eliminarCliente(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres eliminar este cliente?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.eliminarCliente(id).subscribe(() => {
          this.clientes = this.clientes.filter(c => c.idCliente !== id);
          // SweetAlert de éxito
          Swal.fire({
            icon: 'success',
            title: 'Cliente eliminado',
            text: 'El cliente ha sido eliminado correctamente.',
          });
        });
      }
    });
  }

  obtenerCliente(id: number): void {
    this.clienteService.obtenerClientePorId(id).subscribe((data) => {
      this.cliente = data;
      this.abrirModal();
    });
  }

  abrirModal(): void {
    if (this.cliente.idCliente === 0) {
      // Si el cliente no tiene un ID, reinicia los datos del cliente
      this.resetCliente();
    }
    if (this.modalInstance) {
      this.modalInstance.show();
    }
  }
  

  cerrarModal(): void {
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
  }

  resetCliente(): void {
    this.cliente = {
      idCliente: 0,
      nombre: '',
      apellido: '',
      tipoDocumento: '',
      numeroDocumento: '',
      telefono: '',
      correo: '',
      direccion: ''
    };
  }
}

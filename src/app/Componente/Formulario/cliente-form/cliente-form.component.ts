import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Cliente } from '../../Modelo/Cliente';
import { ClienteService } from '../../servicios/cliente.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
declare var bootstrap: any;

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [ CommonModule, FormsModule],
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css'],
})
export class ClienteFormComponent implements OnInit {
  clientes: Cliente[] = [];
  cliente: Cliente = {
    idCliente: 0,
    CodigoCliente: '',
    nombre: '',
    apellido: '',
    tipoDocumento: '',
    numeroDocumento: '',
    telefono: '',
    correo: '',
    direccion: '',
  };

  // Referencia del modal
  @ViewChild('clienteModal', { static: false }) clienteModal: ElementRef | undefined;

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.obtenerClientes();
  }

  // Obtener todos los clientes
  obtenerClientes(): void {
    this.clienteService.obtenerClientes().subscribe((data) => {
      this.clientes = data;
    });
  }

  // Crear un nuevo cliente
  crearCliente(): void {
    console.log(this.cliente);
    this.clienteService.crearCliente(this.cliente).subscribe((nuevoCliente) => {
      this.clientes.push(nuevoCliente);
      this.cerrarModal(); // Cerrar modal después de crear el cliente
      this.resetCliente(); // Limpiar formulario
    });
  }

  // Actualizar un cliente
  actualizarCliente(id: number): void {
    this.clienteService.actualizarCliente(id, this.cliente).subscribe((clienteActualizado) => {
      const index = this.clientes.findIndex((cli) => cli.idCliente === id);
      if (index !== -1) {
        this.clientes[index] = clienteActualizado;
      }
      this.cerrarModal(); // Cerrar modal después de actualizar
    });
  }

  // Eliminar un cliente
  eliminarCliente(id: number): void {
    this.clienteService.eliminarCliente(id).subscribe(() => {
      this.clientes = this.clientes.filter((cli) => cli.idCliente !== id);
    });
  }

  // Obtener un cliente por ID
  obtenerCliente(id: number): void {
    this.clienteService.obtenerClientePorId(id).subscribe((data) => {
      this.cliente = data;
      this.abrirModal(); // Abrir modal cuando se carga un cliente para editar
    });
  }

  // Abrir el modal
  abrirModal(): void {
    const modalElement = this.clienteModal?.nativeElement;
    if (!modalElement) {
      console.error('Modal element is undefined');
      return;
    }
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }

  // Cerrar el modal
  cerrarModal(): void {
    const modalElement = this.clienteModal?.nativeElement;
    if (!modalElement) {
      console.error('Modal element is undefined');
      return;
    }
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
  }

  // Limpiar el formulario
  resetCliente(): void {
    this.cliente = {
      idCliente: 0,
      CodigoCliente: '',
      nombre: '',
      apellido: '',
      tipoDocumento: '',
      numeroDocumento: '',
      telefono: '',
      correo: '',
      direccion: '',
    };
  }
}

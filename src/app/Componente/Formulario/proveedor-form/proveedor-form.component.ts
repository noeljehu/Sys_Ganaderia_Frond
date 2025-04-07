import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProveedorService } from '../../servicios/proveedor.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';  // Importa SweetAlert2

@Component({
  selector: 'app-proveedor-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './proveedor-form.component.html',
  styleUrls: ['./proveedor-form.component.css']
})
export class ProveedorFormComponent implements OnInit {
  proveedorForm: FormGroup = new FormGroup({});
  modalVisible = false;
  isEditMode = false;
  proveedores: any[] = [];

  constructor(private fb: FormBuilder, private proveedorService: ProveedorService) {}

  ngOnInit(): void {
    this.proveedorForm = this.fb.group({
      id: [null],
      ruc: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      empresa: ['', Validators.required],
      representante: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      estado: [true]  // por defecto activo
    });

    this.cargarProveedores();
  }

  cargarProveedores(): void {
    this.proveedorService.listarProveedores().subscribe(
      (proveedores) => {
        this.proveedores = proveedores;
      },
      (error) => {
        console.error('Error al cargar los proveedores', error);
      }
    );
  }

  abrirModalRegistro() {
    this.isEditMode = false;
    this.modalVisible = true;
    this.proveedorForm.reset({ estado: true }); // por defecto activo
  }

  abrirModalEditar(proveedor: any) {
    if (proveedor && proveedor.id) {
      this.isEditMode = true;
      this.modalVisible = true;
      this.proveedorForm.patchValue({
        id: proveedor.id,
        ruc: proveedor.ruc,
        empresa: proveedor.empresa,
        representante: proveedor.representante,
        telefono: proveedor.telefono,
        correo: proveedor.correo,
        estado: proveedor.estado
      });
    } else {
      console.error('Proveedor inválido para editar:', proveedor);
    }
  }

  cerrarModal() {
    this.modalVisible = false;
  }

  guardarProveedor() {
    if (this.proveedorForm.valid) {
      const proveedorData = this.proveedorForm.value;

      if (this.isEditMode) {
        if (proveedorData.id) {
          this.proveedorService.actualizarProveedor(proveedorData.id, proveedorData).subscribe(
            () => {
              this.cargarProveedores();
              this.cerrarModal();
              Swal.fire('¡Proveedor actualizado!', '', 'success');  // Muestra la alerta de éxito
            },
            (error) => {
              console.error('Error al actualizar el proveedor', error);
              Swal.fire('Error', 'Hubo un problema al actualizar el proveedor', 'error');  // Muestra la alerta de error
            }
          );
        }
      } else {
        this.proveedorService.registrarProveedor(proveedorData).subscribe(
          (nuevoProveedor: any) => {
            this.proveedores.push(nuevoProveedor);
            this.cerrarModal();
            Swal.fire('¡Proveedor registrado!', '', 'success');  // Muestra la alerta de éxito
          },
          (error: any) => {
            console.error('Error al registrar el proveedor', error);
            Swal.fire('Error', 'Hubo un problema al registrar el proveedor', 'error');  // Muestra la alerta de error
          }
        );
      }
    } else {
      Swal.fire('¡Formulario incompleto!', 'Por favor, completa todos los campos.', 'warning');  // Alerta de advertencia
    }
  }

  eliminarProveedor(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.proveedorService.eliminarProveedor(id).subscribe(
          () => {
            this.proveedores = this.proveedores.filter(proveedor => proveedor.id !== id);
            Swal.fire('¡Proveedor eliminado!', '', 'success');  // Alerta de éxito
          },
          (error: any) => {
            console.error('Error al eliminar el proveedor', error);
            Swal.fire('Error', 'Hubo un problema al eliminar el proveedor', 'error');  // Alerta de error
          }
        );
      }
    });
  }
}

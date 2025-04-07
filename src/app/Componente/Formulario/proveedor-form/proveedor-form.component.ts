import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProveedorService } from '../../servicios/proveedor.service'; // Asegúrate de importar el servicio correctamente
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-proveedor-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Puedes agregar módulos aquí si es necesario
  templateUrl: './proveedor-form.component.html',
  styleUrls: ['./proveedor-form.component.css']
})
export class ProveedorFormComponent implements OnInit {
  proveedorForm: FormGroup = new FormGroup({});
  modalVisible = false;           // Controla si el modal está visible o no
  isEditMode = false;             // Controla si el modal está en modo edición o creación
  proveedores: any[] = [];        // Lista de proveedores que se obtendrá de la API
  displayedColumns: string[] = ['empresa', 'representante', 'telefono', 'correo', 'acciones']; // Columnas de la tabla
  
  constructor(private fb: FormBuilder, private proveedorService: ProveedorService) { }

  ngOnInit(): void {
    // Inicializar el formulario con los controles
    this.proveedorForm = this.fb.group({
      id: [null],                   // Asegúrate de tener un campo ID para editar
      empresa: ['', Validators.required],
      representante: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]]
    });

    // Cargar los proveedores desde la API
    this.cargarProveedores();
  }

  // Cargar los proveedores desde la API
  cargarProveedores(): void {
    this.proveedorService.listarProveedores().subscribe(
      (proveedores) => {
        console.log('Proveedores cargados:', proveedores);  // Verificar los proveedores cargados
        this.proveedores = proveedores;
      },
      (error) => {
        console.error('Error al cargar los proveedores', error);
      }
    );
  }

  // Función para abrir el modal en modo "Registrar Proveedor"
  abrirModalRegistro() {
    this.isEditMode = false;          // Establecer en modo registro
    this.modalVisible = true;         // Mostrar el modal
    this.proveedorForm?.reset();       // Limpiar los campos del formulario
  }

  // Función para abrir el modal en modo "Editar Proveedor"
  abrirModalEditar(proveedor: any) {
    console.log('Proveedor recibido en editar:', proveedor);  // Verificar el objeto proveedor

    if (proveedor && proveedor.id) {
      this.isEditMode = true;  // Establecer en modo edición
      this.modalVisible = true;  // Mostrar el modal

      // Asignar los valores del proveedor al formulario
      this.proveedorForm.patchValue({
        id: proveedor.id,
        empresa: proveedor.empresa,
        representante: proveedor.representante,
        telefono: proveedor.telefono,
        correo: proveedor.correo
      });

      console.log('Formulario con datos del proveedor:', this.proveedorForm.value);  // Verifica los datos del formulario
    } else {
      console.error('El proveedor no tiene un ID válido:', proveedor);  // Log si el proveedor no tiene id
    }
  }

  // Función para cerrar el modal
  cerrarModal() {
    this.modalVisible = false; // Ocultar el modal
  }

  // Función para guardar (registrar o actualizar) un proveedor
  guardarProveedor() {
    if (this.proveedorForm && this.proveedorForm.valid) {
      const proveedorData = this.proveedorForm.value;
      console.log('Datos del proveedor:', proveedorData);  // Verificar los datos del formulario

      if (this.isEditMode) {
        // Si está en modo edición, el proveedor debe tener un `id`
        if (proveedorData.id) {
          // Actualizar proveedor solo si el `id` existe
          this.proveedorService.actualizarProveedor(proveedorData.id, proveedorData).subscribe(
            () => {
              this.cargarProveedores();  // Recargar proveedores
              this.cerrarModal();
            },
            (error) => {
              console.error('Error al actualizar el proveedor', error);
            }
          );
        } else {
          console.error('ID del proveedor es undefined en modo edición');
        }
      } else {
        // Si está en modo registro, no deberíamos enviar un `id`
        this.proveedorService.registrarProveedor(proveedorData).subscribe(
          (nuevoProveedor: any) => {
            this.proveedores.push(nuevoProveedor);  // Agregar el nuevo proveedor
            this.cerrarModal();
          },
          (error: any) => {
            console.error('Error al registrar el proveedor', error);
          }
        );
      }
    }
  }

  // Función para eliminar un proveedor
  eliminarProveedor(id: number) {
    this.proveedorService.eliminarProveedor(id).subscribe(
      () => {
        this.proveedores = this.proveedores.filter(proveedor => proveedor.id !== id);
        console.log('Proveedor eliminado con ID:', id);
      },
      (error: any) => {
        console.error('Error al eliminar el proveedor', error);
      }
    );
  }
}

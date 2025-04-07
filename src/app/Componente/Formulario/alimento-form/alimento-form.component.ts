import { Component, OnInit } from '@angular/core';
import { alimentoService } from '../../servicios/alimento.service';
import { ProveedorService } from '../../servicios/proveedor.service';
import { Alimento } from '../../Modelo/Alimento';
import { Proveedor } from '../../Modelo/proveedor.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

declare var bootstrap: any;

@Component({
  selector: 'app-alimento-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './alimento-form.component.html',
  styleUrls: ['./alimento-form.component.css']
})
export class AlimentoFormComponent implements OnInit {
  searchEmpresa: string = '';
  searchTipo: string = '';
  alimentos: Alimento[] = [];
  alimentosFiltrados: Alimento[] = this.alimentos;
  proveedores: Proveedor[] = [];
  totalPages: number = 3;
  page: number = 1;
  size: number = 100;

  nuevoAlimento: Alimento = {
    nombre: '',
    tipo: '',
    cantidad: 0,
    unidadMedida: '',
    precioPorUnidad: 0,
    precioTotal: 0,
    fechaIngreso: new Date().toISOString().split('T')[0],  // Fecha actual
    observaciones: '',
    proveedor: {
      id: 1,
      ruc: '',
      empresa: '',
      representante: '',
      telefono: '',
      correo: '',
      estado: false
    },  // Solo el id del proveedor
    proveedorEmpresa: ''
  };

  constructor(
    private alimentoService: alimentoService,
    private proveedorService: ProveedorService
  ) {}

  ngOnInit(): void {
    this.cargarAlimentos();
   
  }

  

  // Métodos para búsqueda de empresa y tipo
  buscarPorEmpresa() {
    this.alimentosFiltrados = this.alimentos.filter(alimento =>
      alimento.proveedorEmpresa?.toLowerCase().includes(this.searchEmpresa.toLowerCase())
    );
  }

  buscarPorTipo() {
    this.alimentosFiltrados = this.alimentos.filter(alimento =>
      alimento.tipo?.toLowerCase().includes(this.searchTipo.toLowerCase())
    );
  }

  // Método para abrir el modal de agregar alimento
  abrirModalAgregar() {
    const modal = new bootstrap.Modal(document.getElementById('modalAgregar')!);
    modal.show();
  }

  // Método para cargar los alimentos
  cargarAlimentos(): void {
    this.alimentoService.obtenerTodosLosAlimentos().subscribe({
      next: (data) => {
        this.alimentos = data;
      },
      error: (err) => {
        console.error('Error al cargar alimentos:', err);
      }
    });
  }

  // Método para agregar un nuevo alimento
  agregarAlimento(): void {
    this.nuevoAlimento.precioTotal = this.nuevoAlimento.precioPorUnidad * this.nuevoAlimento.cantidad;

    this.alimentoService.crearAlimento(this.nuevoAlimento).subscribe({
      next: (data) => {
        this.cargarAlimentos();  // Recargar la lista de alimentos después de agregar uno nuevo
        this.limpiarFormulario(); // Limpiar el formulario
        this.cerrarModal();  // Cerrar el modal
      },
      error: (err) => {
        console.error('Error al agregar alimento:', err);
      }
    });
  }

  // Método para limpiar el formulario
  limpiarFormulario(): void {
    this.nuevoAlimento = {
      nombre: '',
      tipo: '',
      cantidad: 0,
      unidadMedida: '',
      precioPorUnidad: 0,
      precioTotal: 0,
      fechaIngreso: new Date().toISOString().split('T')[0],
      observaciones: '',
      proveedor: {
        id: 1,
        ruc: '',
        empresa: '',
        representante: '',
        telefono: '',
        correo: '',
        estado: false
      }, // El proveedor siempre será inicializado con un id
      proveedorEmpresa: ''
    };
  }

  // Método para cerrar el modal
  cerrarModal(): void {
    const modal = bootstrap.Modal.getInstance(document.getElementById('modalAgregar')!);
    modal?.hide();
  }
}

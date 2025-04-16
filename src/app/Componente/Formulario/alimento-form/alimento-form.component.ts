import { Component, OnInit } from '@angular/core';
import { Alimento } from '../../Modelo/Alimento';
import { AlimentoService } from '../../servicios/alimento.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

declare var bootstrap: any;

@Component({
  selector: 'app-alimento',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './alimento-form.component.html',
  styleUrls: ['./alimento-form.component.scss']
})
export class AlimentoComponent implements OnInit {
  alimentos: Alimento[] = [];
  selectedAlimento: Alimento = {
    id: 0,
    nombre: '',
    tipo: '',
    cantidad: 0,
    unidadMedida: '',
    precioPorUnidad: 0,
    precioTotal: 0,
    fechaIngreso: '',
    observaciones: '',
    proveedor: '',
    codigoAlimento: ''
  };
  modalIsOpen: boolean = false; // Control para abrir/cerrar el modal

  constructor(private alimentoService: AlimentoService) { }

  ngOnInit(): void {
    this.obtenerAlimentos();
  }

  obtenerAlimentos(): void {
    this.alimentoService.obtenerTodosLosAlimentos().subscribe(
      (data: Alimento[]) => {
        this.alimentos = data;
      },
      (error: any) => {
        console.error('Error al obtener los alimentos', error);
      }
    );
  }

  obtenerAlimentoPorId(id: number): void {
    this.alimentoService.obtenerAlimentoPorId(id).subscribe(
      (data: Alimento | null) => {
        if (data) {
          this.selectedAlimento = data;
          this.abrirModal(); // Abrir el modal con el alimento seleccionado
        }
      },
      (error: any) => {
        console.error('Error al obtener el alimento por ID', error);
      }
    );
  }

  guardarAlimento(alimento: Alimento): void {
    if (alimento.id) {
      this.alimentoService.actualizarAlimento(alimento.id, alimento).subscribe(
        () => {
          this.obtenerAlimentos();
          this.cerrarModal();
        },
        (error: any) => {
          console.error('Error al guardar el alimento', error);
        }
      );
    } else {
      this.alimentoService.guardarAlimento(alimento).subscribe(
        () => {
          this.obtenerAlimentos();
          this.cerrarModal();
        },
        (error: any) => {
          console.error('Error al guardar el alimento', error);
        }
      );
    }
  }
  editarAlimento(id: number): void {
    this.obtenerAlimentoPorId(id);
    const modalElement = document.getElementById('alimentoModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }

  }
     

  eliminarAlimento(id: number): void {
    this.alimentoService.eliminarAlimento(id).subscribe(
      () => {
        this.obtenerAlimentos();
      },
      (error: any) => {
        console.error('Error al eliminar el alimento', error);
      }
    );
  }

  // Método para abrir el modal usando Bootstrap
  abrirModal(alimento?: Alimento): void {
    this.selectedAlimento = alimento ? { ...alimento } : {
      id: 0,
      nombre: '',
      tipo: '',
      cantidad: 0,
      unidadMedida: '',
      precioPorUnidad: 0,
      precioTotal: 0,
      fechaIngreso: '',
      observaciones: '',
      proveedor: '',
      codigoAlimento: ''
    };
  
    const modalElement = document.getElementById('alimentoModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }
  

  // Método para cerrar el modal
  cerrarModal(): void {
    const modalElement = document.getElementById('alimentoModal');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }
  }
  
}

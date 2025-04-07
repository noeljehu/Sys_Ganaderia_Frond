import { Component, OnInit } from '@angular/core';
import { AlimentoService } from '../../servicios/alimento.service';
import { Alimento } from '../../Modelo/Alimento';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProveedorService } from '../../servicios/proveedor.service';

@Component({
  selector: 'app-alimento',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './alimento-form.component.html'
})
export class AlimentoComponent implements OnInit {
  alimentos: Alimento[] = [];
  alimentoForm!: FormGroup;
  currentAlimento: Alimento | null = null;
proveedores: any;

  constructor(
    private alimentoService: AlimentoService,
    private proveedorService: ProveedorService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.obtenerAlimentos();
    this.obtenerProveedores();
  }

  obtenerProveedores(): void {
    this.proveedorService.listarProveedores().subscribe((data: any) => {
      this.proveedores = data;
      console.log(this.proveedores);
    });
  }

  initForm(): void {
    this.alimentoForm = this.fb.group({
      codigoAlimento: [''], // se generará automáticamente
      nombre: ['', Validators.required],
      tipo: ['', Validators.required],
      cantidad: [0, [Validators.required, Validators.min(0.1)]],
      unidadMedida: ['', Validators.required],
      precioPorUnidad: [0, [Validators.required, Validators.min(0)]],
      observaciones: [''],
      proveedor: ['', Validators.required]
    });
  }

  obtenerAlimentos(): void {
    this.alimentoService.getAlimentos().subscribe(data => {
      this.alimentos = data;
    });
  }

  abrirModal(alimento: Alimento | null = null): void {
    this.currentAlimento = alimento;
  
    if (alimento) {
      // Si el alimento tiene proveedor, asignamos el nombre del proveedor
      this.alimentoForm.patchValue({
        ...alimento,
        proveedor: alimento.proveedor || null  // Usamos directamente el nombre del proveedor
      });
    } else {
      this.alimentoForm.reset({
        cantidad: 0,
        precioPorUnidad: 0,
        proveedor: this.currentAlimento ? this.currentAlimento.proveedor : null  // Mantener el proveedor anterior si no se selecciona uno nuevo
      });
    }
  
    const modal = document.getElementById('alimentoModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
    }
  }
  
  
  
  
  
  cerrarModal(): void {
    const modal = document.getElementById('alimentoModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
    }
  }

  guardarAlimento(): void {
    if (this.alimentoForm.invalid) {
      this.alimentoForm.markAllAsTouched();
      return;
    }
  
    const formData = this.alimentoForm.value;
  
    // Si no se seleccionó un proveedor, mantenemos el proveedor anterior
    if (!formData.proveedor && this.currentAlimento) {
      formData.proveedor = this.currentAlimento.proveedor;
    }
  
    if (this.currentAlimento) {
      // Actualizar alimento
      this.alimentoService.actualizarAlimento(this.currentAlimento.id, formData).subscribe(() => {
        this.obtenerAlimentos();
        this.cerrarModal();
      });
    } else {
      // Guardar nuevo alimento
      this.alimentoService
        .guardarAlimento(formData, formData.cantidad, formData.unidadMedida)
        .subscribe(() => {
          this.obtenerAlimentos();
          this.cerrarModal();
        });
    }
  }
  
  

  eliminarAlimento(id: number): void {
    if (confirm('¿Estás seguro de eliminar este alimento?')) {
      this.alimentoService.eliminarAlimento(id).subscribe(() => {
        this.obtenerAlimentos();
      });
    }
  }
}

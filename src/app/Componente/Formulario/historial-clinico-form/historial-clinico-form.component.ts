import { Component } from '@angular/core';
import { HistorialClinicoModalComponent } from "../../modal/historial-clinico-modal/historial-clinico-modal.component";
declare var bootstrap: any;
@Component({
  selector: 'app-historial-clinico-form',
  imports: [HistorialClinicoModalComponent],
  templateUrl: './historial-clinico-form.component.html',
  styleUrl: './historial-clinico-form.component.css'
})
export class HistorialClinicoFormComponent {
  ganado: any;
  abrirModal() {
    const modal = new bootstrap.Modal(this.ganado.nativeElement);
    modal.show();
  }
}

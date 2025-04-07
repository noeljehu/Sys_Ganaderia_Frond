import { Component } from '@angular/core';
import { RegistroAlimentoModalComponent } from "../../modal/registro-alimento-modal/registro-alimento-modal.component";
declare var bootstrap: any;
@Component({
  selector: 'app-registro-alimento-form',
  imports: [RegistroAlimentoModalComponent],
  templateUrl: './registro-alimento-form.component.html',
  styleUrl: './registro-alimento-form.component.css'
})
export class RegistroAlimentoFormComponent {
  registroalimento: any;
  abrirModal() {
    const modal = new bootstrap.Modal(this.registroalimento.nativeElement);
    modal.show();
  }
}

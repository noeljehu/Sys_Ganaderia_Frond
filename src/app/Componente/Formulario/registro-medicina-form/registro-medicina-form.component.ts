import { Component } from '@angular/core';
import { RegistroMedicinamodalComponent } from "../../modal/registro-medicinamodal/registro-medicinamodal.component";
declare var bootstrap: any;
@Component({
  selector: 'app-registro-medicina-form',
  imports: [RegistroMedicinamodalComponent],
  templateUrl: './registro-medicina-form.component.html',
  styleUrl: './registro-medicina-form.component.css'
})
export class RegistroMedicinaFormComponent {
  registromedicina: any;
  abrirModal() {
    const modal = new bootstrap.Modal(this.registromedicina.nativeElement);
    modal.show();
  }
}

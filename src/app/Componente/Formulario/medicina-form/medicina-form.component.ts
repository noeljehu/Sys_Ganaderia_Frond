import { Component } from '@angular/core';
import { MedicinaModalComponent } from "../../modal/medicina-modal/medicina-modal.component";
declare var bootstrap: any;
@Component({
  selector: 'app-medicina-form',
  imports: [MedicinaModalComponent],
  templateUrl: './medicina-form.component.html',
  styleUrl: './medicina-form.component.css'
})
export class MedicinaFormComponent {
  medicina: any;
  abrirModal() {
    const modal = new bootstrap.Modal(this.medicina.nativeElement);
    modal.show();
  }
}

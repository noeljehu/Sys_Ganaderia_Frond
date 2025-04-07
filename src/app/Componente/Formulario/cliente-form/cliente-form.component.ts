import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ClienteModalComponent } from "../../modal/cliente-modal/cliente-modal.component";

declare var bootstrap: any; // Declaramos bootstrap para usarlo desde el CDN

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css'],
  imports: [ClienteModalComponent]
})
export class ClienteFormComponent implements AfterViewInit {
editarCliente(arg0: any) {
throw new Error('Method not implemented.');
}
  @ViewChild('modalCliente') modalElement!: ElementRef;
  modal: any;

  ngAfterViewInit() {
    this.modal = new bootstrap.Modal(this.modalElement.nativeElement);
  }

  abrirModal() {
    if (this.modal) {
      this.modal.show();
    }
  }
}

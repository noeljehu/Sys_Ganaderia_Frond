import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroUsuariomodalComponent } from './registro-usuariomodal.component';

describe('RegistroUsuariomodalComponent', () => {
  let component: RegistroUsuariomodalComponent;
  let fixture: ComponentFixture<RegistroUsuariomodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroUsuariomodalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroUsuariomodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

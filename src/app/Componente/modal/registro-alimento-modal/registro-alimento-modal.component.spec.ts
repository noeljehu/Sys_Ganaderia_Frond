import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroAlimentoModalComponent } from './registro-alimento-modal.component';

describe('RegistroAlimentoModalComponent', () => {
  let component: RegistroAlimentoModalComponent;
  let fixture: ComponentFixture<RegistroAlimentoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroAlimentoModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroAlimentoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

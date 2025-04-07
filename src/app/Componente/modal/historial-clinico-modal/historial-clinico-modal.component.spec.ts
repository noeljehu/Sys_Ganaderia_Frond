import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialClinicoModalComponent } from './historial-clinico-modal.component';

describe('HistorialClinicoModalComponent', () => {
  let component: HistorialClinicoModalComponent;
  let fixture: ComponentFixture<HistorialClinicoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialClinicoModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialClinicoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

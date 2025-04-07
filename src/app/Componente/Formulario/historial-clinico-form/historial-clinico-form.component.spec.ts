import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialClinicoFormComponent } from './historial-clinico-form.component';

describe('HistorialClinicoFormComponent', () => {
  let component: HistorialClinicoFormComponent;
  let fixture: ComponentFixture<HistorialClinicoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialClinicoFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialClinicoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

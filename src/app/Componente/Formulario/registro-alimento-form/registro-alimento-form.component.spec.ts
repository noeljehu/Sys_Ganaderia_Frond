import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroAlimentoFormComponent } from './registro-alimento-form.component';

describe('RegistroAlimentoFormComponent', () => {
  let component: RegistroAlimentoFormComponent;
  let fixture: ComponentFixture<RegistroAlimentoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroAlimentoFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroAlimentoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

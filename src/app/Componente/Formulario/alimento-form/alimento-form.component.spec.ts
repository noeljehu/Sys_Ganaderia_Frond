import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlimentoFormComponent } from './alimento-form.component';

describe('AlimentoFormComponent', () => {
  let component: AlimentoFormComponent;
  let fixture: ComponentFixture<AlimentoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlimentoFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlimentoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

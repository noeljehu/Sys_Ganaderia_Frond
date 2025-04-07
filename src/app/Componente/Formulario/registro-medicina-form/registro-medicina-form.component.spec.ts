import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroMedicinaFormComponent } from './registro-medicina-form.component';

describe('RegistroMedicinaFormComponent', () => {
  let component: RegistroMedicinaFormComponent;
  let fixture: ComponentFixture<RegistroMedicinaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroMedicinaFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroMedicinaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

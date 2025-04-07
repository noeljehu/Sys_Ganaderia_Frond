import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GanadoFormComponent } from './ganado-form.component';

describe('GanadoFormComponent', () => {
  let component: GanadoFormComponent;
  let fixture: ComponentFixture<GanadoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GanadoFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GanadoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

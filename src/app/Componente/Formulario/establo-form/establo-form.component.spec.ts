import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstabloFormComponent } from './establo-form.component';

describe('EstabloFormComponent', () => {
  let component: EstabloFormComponent;
  let fixture: ComponentFixture<EstabloFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstabloFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstabloFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

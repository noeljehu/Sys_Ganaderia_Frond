import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicinaFormComponent } from './medicina-form.component';

describe('MedicinaFormComponent', () => {
  let component: MedicinaFormComponent;
  let fixture: ComponentFixture<MedicinaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicinaFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicinaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

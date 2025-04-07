import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroMedicinamodalComponent } from './registro-medicinamodal.component';

describe('RegistroMedicinamodalComponent', () => {
  let component: RegistroMedicinamodalComponent;
  let fixture: ComponentFixture<RegistroMedicinamodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroMedicinamodalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroMedicinamodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

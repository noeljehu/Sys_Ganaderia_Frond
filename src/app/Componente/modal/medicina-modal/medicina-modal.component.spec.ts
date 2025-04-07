import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicinaModalComponent } from './medicina-modal.component';

describe('MedicinaModalComponent', () => {
  let component: MedicinaModalComponent;
  let fixture: ComponentFixture<MedicinaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicinaModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicinaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

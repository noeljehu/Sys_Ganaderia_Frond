import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GanadoModalComponent } from './ganado-modal.component';

describe('GanadoModalComponent', () => {
  let component: GanadoModalComponent;
  let fixture: ComponentFixture<GanadoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GanadoModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GanadoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlimentosModalComponent } from './alimentos-modal.component';

describe('AlimentosModalComponent', () => {
  let component: AlimentosModalComponent;
  let fixture: ComponentFixture<AlimentosModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlimentosModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlimentosModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

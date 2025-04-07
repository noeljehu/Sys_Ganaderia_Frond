import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorralFormComponent } from './corral-form.component';

describe('CorralFormComponent', () => {
  let component: CorralFormComponent;
  let fixture: ComponentFixture<CorralFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorralFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorralFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VectorPeru } from './vector-peru';

describe('VectorPeru', () => {
  let component: VectorPeru;
  let fixture: ComponentFixture<VectorPeru>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VectorPeru]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VectorPeru);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

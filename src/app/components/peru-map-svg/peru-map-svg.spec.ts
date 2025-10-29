import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeruMapSvg } from './peru-map-svg';

describe('PeruMapSvg', () => {
  let component: PeruMapSvg;
  let fixture: ComponentFixture<PeruMapSvg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeruMapSvg]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeruMapSvg);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

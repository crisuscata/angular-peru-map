import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeruMap } from './peru-map';

describe('PeruMap', () => {
  let component: PeruMap;
  let fixture: ComponentFixture<PeruMap>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeruMap]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeruMap);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

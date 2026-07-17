import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwiggyPanel } from './swiggy-panel';

describe('SwiggyPanel', () => {
  let component: SwiggyPanel;
  let fixture: ComponentFixture<SwiggyPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwiggyPanel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwiggyPanel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

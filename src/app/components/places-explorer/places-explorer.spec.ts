import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacesExplorer } from './places-explorer';

describe('PlacesExplorer', () => {
  let component: PlacesExplorer;
  let fixture: ComponentFixture<PlacesExplorer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlacesExplorer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlacesExplorer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

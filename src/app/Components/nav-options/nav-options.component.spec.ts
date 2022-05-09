import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavOptionsComponent } from './nav-options.component';

describe('NavOptionsComponent', () => {
  let component: NavOptionsComponent;
  let fixture: ComponentFixture<NavOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

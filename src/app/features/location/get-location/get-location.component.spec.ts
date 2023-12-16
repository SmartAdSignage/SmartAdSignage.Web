import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetLocationComponent } from './get-location.component';

describe('GetLocationComponent', () => {
  let component: GetLocationComponent;
  let fixture: ComponentFixture<GetLocationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetLocationComponent]
    });
    fixture = TestBed.createComponent(GetLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

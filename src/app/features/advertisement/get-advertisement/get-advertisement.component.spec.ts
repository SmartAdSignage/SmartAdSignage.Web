import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAdvertisementComponent } from './get-advertisement.component';

describe('GetAdvertisementComponent', () => {
  let component: GetAdvertisementComponent;
  let fixture: ComponentFixture<GetAdvertisementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetAdvertisementComponent]
    });
    fixture = TestBed.createComponent(GetAdvertisementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

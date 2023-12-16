import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetIotDevicesComponent } from './get-iot-devices.component';

describe('GetIotDevicesComponent', () => {
  let component: GetIotDevicesComponent;
  let fixture: ComponentFixture<GetIotDevicesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetIotDevicesComponent]
    });
    fixture = TestBed.createComponent(GetIotDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

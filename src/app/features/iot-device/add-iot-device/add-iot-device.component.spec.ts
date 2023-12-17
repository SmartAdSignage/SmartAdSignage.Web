import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIotDeviceComponent } from './add-iot-device.component';

describe('AddIotDeviceComponent', () => {
  let component: AddIotDeviceComponent;
  let fixture: ComponentFixture<AddIotDeviceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddIotDeviceComponent]
    });
    fixture = TestBed.createComponent(AddIotDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

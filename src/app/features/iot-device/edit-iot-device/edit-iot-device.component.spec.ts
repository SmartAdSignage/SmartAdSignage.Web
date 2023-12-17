import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIotDeviceComponent } from './edit-iot-device.component';

describe('EditIotDeviceComponent', () => {
  let component: EditIotDeviceComponent;
  let fixture: ComponentFixture<EditIotDeviceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditIotDeviceComponent]
    });
    fixture = TestBed.createComponent(EditIotDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

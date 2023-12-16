import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetQueuesComponent } from './get-queues.component';

describe('GetQueuesComponent', () => {
  let component: GetQueuesComponent;
  let fixture: ComponentFixture<GetQueuesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetQueuesComponent]
    });
    fixture = TestBed.createComponent(GetQueuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQueueComponent } from './edit-queue.component';

describe('EditQueueComponent', () => {
  let component: EditQueueComponent;
  let fixture: ComponentFixture<EditQueueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditQueueComponent]
    });
    fixture = TestBed.createComponent(EditQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

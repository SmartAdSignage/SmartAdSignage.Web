import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetPanelComponent } from './get-panel.component';

describe('GetPanelComponent', () => {
  let component: GetPanelComponent;
  let fixture: ComponentFixture<GetPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetPanelComponent]
    });
    fixture = TestBed.createComponent(GetPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

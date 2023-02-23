import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogViewModalComponent } from './log-view-modal.component';

describe('LogViewModalComponent', () => {
  let component: LogViewModalComponent;
  let fixture: ComponentFixture<LogViewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogViewModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsControlsComponent } from './jobs-controls.component';

describe('JobsControlsComponent', () => {
  let component: JobsControlsComponent;
  let fixture: ComponentFixture<JobsControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobsControlsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobsControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

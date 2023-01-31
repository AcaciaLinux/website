import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildJobsComponent } from './build-jobs.component';

describe('BuildJobsComponent', () => {
  let component: BuildJobsComponent;
  let fixture: ComponentFixture<BuildJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuildJobsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuildJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

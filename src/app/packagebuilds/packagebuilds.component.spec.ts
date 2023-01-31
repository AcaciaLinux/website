import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagebuildsComponent } from './packagebuilds.component';

describe('PackagebuildsComponent', () => {
  let component: PackagebuildsComponent;
  let fixture: ComponentFixture<PackagebuildsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackagebuildsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackagebuildsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

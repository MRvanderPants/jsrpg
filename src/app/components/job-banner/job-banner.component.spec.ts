import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobBannerComponent } from './job-banner.component';

describe('JobBannerComponent', () => {
  let component: JobBannerComponent;
  let fixture: ComponentFixture<JobBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

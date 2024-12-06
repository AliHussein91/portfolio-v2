import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsSampleComponent } from './projects-sample.component';

describe('ProjectsSampleComponent', () => {
  let component: ProjectsSampleComponent;
  let fixture: ComponentFixture<ProjectsSampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsSampleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

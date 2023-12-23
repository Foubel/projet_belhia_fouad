import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TetiereComponent } from './tetiere.component';

describe('TetiereComponent', () => {
  let component: TetiereComponent;
  let fixture: ComponentFixture<TetiereComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TetiereComponent]
    });
    fixture = TestBed.createComponent(TetiereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

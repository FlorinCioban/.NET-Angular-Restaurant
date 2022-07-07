import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateWaitersComponent } from './update-waiters.component';

describe('UpdateWaitersComponent', () => {
  let component: UpdateWaitersComponent;
  let fixture: ComponentFixture<UpdateWaitersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateWaitersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateWaitersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

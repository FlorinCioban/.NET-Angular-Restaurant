import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWaitersComponent } from './add-waiters.component';

describe('AddWaitersComponent', () => {
  let component: AddWaitersComponent;
  let fixture: ComponentFixture<AddWaitersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddWaitersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWaitersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

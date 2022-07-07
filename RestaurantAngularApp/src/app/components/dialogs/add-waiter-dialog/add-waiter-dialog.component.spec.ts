import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWaiterDialogComponent } from './add-waiter-dialog.component';

describe('AddWaiterDialogComponent', () => {
  let component: AddWaiterDialogComponent;
  let fixture: ComponentFixture<AddWaiterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddWaiterDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWaiterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

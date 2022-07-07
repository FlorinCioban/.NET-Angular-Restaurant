import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTablesComponent } from './update.component';

describe('UpdateComponent', () => {
  let component: UpdateTablesComponent;
  let fixture: ComponentFixture<UpdateTablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateTablesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPostingsComponent } from './list-postings.component';

describe('ListPostingsComponent', () => {
  let component: ListPostingsComponent;
  let fixture: ComponentFixture<ListPostingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListPostingsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListPostingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

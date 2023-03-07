import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '@app/@shared';
import { of } from 'rxjs';
import { PostingsApiService } from '../../services/postings-api.service';

import { MemoListComponent } from './memo-list.component';

describe('MemoListComponent', () => {
  let component: MemoListComponent;
  let fixture: ComponentFixture<MemoListComponent>;
  let postingsApiService: jasmine.SpyObj<PostingsApiService>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, NoopAnimationsModule],
      declarations: [MemoListComponent],
      providers: [
        {
          provide: PostingsApiService,
          useValue: jasmine.createSpyObj('PostingsApiService', [
            'getRecentMemos',
          ]),
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    postingsApiService = TestBed.inject(
      PostingsApiService
    ) as jasmine.SpyObj<PostingsApiService>;
    fixture = TestBed.createComponent(MemoListComponent);
    component = fixture.componentInstance;
    postingsApiService.getRecentMemos.and.returnValue(of([]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

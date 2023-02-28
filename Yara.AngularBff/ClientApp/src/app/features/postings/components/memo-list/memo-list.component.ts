import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Memo } from '../../services/models/memo';
import { PostingsApiService } from '../../services/postings-api.service';

@Component({
  selector: 'app-memo-list',
  templateUrl: './memo-list.component.html',
  styleUrls: ['./memo-list.component.scss'],
})
export class MemoListComponent implements OnInit {
  memos: Memo[] | undefined;
  isLoading = false;

  constructor(private postingsService: PostingsApiService) {}

  ngOnInit() {
    this.isLoading = true;
    this.postingsService
      .getRecentMemos()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((memos: Memo[]) => {
        this.memos = memos;
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { Memo } from '@app/postings/services/models/memo';
import { PostingsService } from '@app/postings/services/postings.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-list-postings',
  templateUrl: './list-postings.component.html',
  styleUrls: ['./list-postings.component.scss'],
})
export class ListPostingsComponent implements OnInit {
  memos: Memo[] | undefined;
  isLoading = false;

  constructor(private postingsService: PostingsService) {}

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

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Memo } from './models/memo';

const apiRoutes = {
  recentMemos: () => `/api/memo/`,
};

@Injectable({
  providedIn: 'root',
})
export class PostingsApiService {
  constructor(private httpClient: HttpClient) {}

  getRecentMemos(): Observable<Memo[]> {
    return this.httpClient.get<Memo[]>(apiRoutes.recentMemos()).pipe(
      map((result) => result),
      catchError(() => of([]))
    );
  }
}

import { MemoApiActions } from '.';
import { Memo } from '../../services/models/memo';

describe('Postings Actions', () => {
  it('should create MemosLoadSuccess action', () => {
    const memos: Memo[] = [
      { body: 'some text', id: 1, title: 'some title', entryDate: new Date() },
    ];
    const action = MemoApiActions.loadMemosSuccess({ memos });
    expect(action.type).toEqual(MemoApiActions.loadMemosSuccess.type);
    expect(action.memos).toEqual(
      jasmine.objectContaining({
        ...memos,
      })
    );
  });

  it('should create MemosLoadFailure action', () => {
    const error = 'http error code 500';
    const action = MemoApiActions.loadMemosFailure({ error });
    expect(action.type).toEqual(MemoApiActions.loadMemosFailure.type);
    expect(action.error).toEqual(error);
  });
});

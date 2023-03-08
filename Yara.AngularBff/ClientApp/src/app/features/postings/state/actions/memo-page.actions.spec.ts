import { MemoPageActions } from '.';

describe('Postings Actions', () => {
  it('should create MemosLoad action', () => {
    const action = MemoPageActions.loadMemos();
    expect(action.type).toEqual(MemoPageActions.loadMemos.type);
  });
});

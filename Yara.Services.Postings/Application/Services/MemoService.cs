using MongoDB.Driver;
using NodaTime;
using Unified;
using Yara.Services.Postings.Application.Model;
using Yara.Services.Postings.Infrastructure;
using Yara.Services.Postings.Presentation.DataContracts.Commands;

namespace Yara.Services.Postings.Application.Services;

public class MemoService
{
    private readonly IMongoCollection<Memo> _memoCollection;
    private readonly PostingsDbContext _dbContext;
    private readonly IClock _systemClock;

    public MemoService(
        PostingsDbContext dbContext,
        IClock systemClock)
    {
        _dbContext = dbContext;
        _memoCollection = _dbContext.GetCollection<Memo>("Memos");
        _systemClock = systemClock;
    }

    public async Task<List<Memo>> GetAsync() =>
        await _memoCollection.Find(_ => true).ToListAsync();

    public async Task<Memo?> GetAsync(string id)
    {
        return await _memoCollection.Find(x => x.Id == id).FirstOrDefaultAsync();
    }

    public async Task<string> CreateAsync(CreateMemo command)
    {
        var dateCreated = _systemClock.GetCurrentInstant();
        var id = new UnifiedId(_systemClock.GetCurrentInstant().ToUnixTimeTicks());
        var newMemo = new Memo(id, command.Title, command.Body, dateCreated);
        await _memoCollection.InsertOneAsync(newMemo);
        return id;
    }

    public async Task UpdateAsync(string memoId, UpdateMemo updateMemo)
    {
        var memo = await _memoCollection.Find(x => x.Id == memoId).FirstOrDefaultAsync();
        if (memo != null)
        {
            var modifyDate = _systemClock.GetCurrentInstant();
            if (!memo.Title.Equals(updateMemo.Title))
            {
                memo.ChangeTitle(updateMemo.Title, modifyDate);
            }
            if (!memo.Body.Equals(updateMemo.Body))
            {
                memo.ChangeBody(updateMemo.Body, modifyDate);
            }

            await _memoCollection.ReplaceOneAsync(x => x.Id == memoId, memo);
        }
    }

    public async Task RemoveAsync(string memoId)
    {
        await _memoCollection.DeleteOneAsync(x => x.Id == memoId);
    }
}

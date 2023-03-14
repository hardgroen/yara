using Microsoft.Extensions.Options;
using MongoDB.Driver;
using NodaTime;
using Yara.Services.Postings.Application.Model;
using Yara.Services.Postings.DataContracts.Commands;
using Yara.Services.Postings.Infra;

namespace Yara.Services.Postings.Application.Services
{
    public class MemoService
    {
        private readonly IMongoCollection<Memo> _memoCollection;
        private readonly IClock _systemClock;

        public MemoService(
            IOptions<PostingsDatabaseSettings> postingsDatabaseSettings,
            IClock systemClock)
        {
            var mongoClient = new MongoClient(
                postingsDatabaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                postingsDatabaseSettings.Value.DatabaseName);

            _memoCollection = mongoDatabase.GetCollection<Memo>(
                postingsDatabaseSettings.Value.MemoCollectionName);

            _systemClock = systemClock;
        }

        public async Task<List<Memo>> GetAsync() =>
            await _memoCollection.Find(_ => true).ToListAsync();

        public async Task<Memo?> GetAsync(long id) =>
            await _memoCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task<long> CreateAsync(CreateMemo command) {
            var dateCreated = _systemClock.GetCurrentInstant();
            var newMemo = new Memo(command.Title, command.Body, dateCreated);
            await _memoCollection.InsertOneAsync(newMemo);
            return newMemo.Id;
        }

        public async Task UpdateAsync(long id, Memo updatedMemo) =>
            await _memoCollection.ReplaceOneAsync(x => x.Id == id, updatedMemo);

        public async Task RemoveAsync(long id) =>
            await _memoCollection.DeleteOneAsync(x => x.Id == id);
    }
}

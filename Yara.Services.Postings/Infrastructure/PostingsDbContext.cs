using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Yara.Services.Postings.Presentation.Infra;

namespace Yara.Services.Postings.Infrastructure;

public class PostingsDbContext
{
    private IMongoDatabase _db { get; set; }
    private MongoClient _mongoClient { get; set; }
    // public IClientSessionHandle Session { get; set; }
    public PostingsDbContext(IOptions<PostingsDatabaseSettings> configuration)
    {
        _mongoClient = new MongoClient(configuration.Value.ConnectionString);
        _db = _mongoClient.GetDatabase(configuration.Value.DatabaseName);
    }

    public IMongoCollection<T> GetCollection<T>(string name)
    {
        return _db.GetCollection<T>(name);
    }
}


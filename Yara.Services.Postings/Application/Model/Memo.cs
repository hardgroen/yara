using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using NodaTime;
using Unified;

namespace Yara.Services.Postings.Application.Model
{
    public class Memo
    {
        [BsonId]
        [BsonRepresentation(BsonType.String)]
        public string Id { get; private set; }
        public string Title { get; private set; } = string.Empty;
        public string Body { get; private set; } = string.Empty;
        public Instant  DateCreatedUtc { get; private set; }
        public Instant? DateModifiedUtc { get; private set; }

        public Memo(string id, string title, string body, Instant dateCreated)
        {
            Id = id;
            // Id = ObjectId.GenerateNewId().ToString();
            Title = title;
            Body = body;
            DateCreatedUtc = dateCreated;
        }

        public void ChangeTitle(string newTitle, Instant modifyDate)
        {
            Title = newTitle;
            DateModifiedUtc = modifyDate;
        }

        public void ChangeBody(string newBody, Instant modifyDate)
        {
            Body = newBody;
            DateModifiedUtc = modifyDate;
        }
    }
}

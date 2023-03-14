using NodaTime;
using Unified;

namespace Yara.Services.Postings.Application.Model
{
    public class Memo
    {
        public long Id { get; private set; }
        public string Title { get; private set; } = string.Empty;
        public string Body { get; private set; } = string.Empty;
        public Instant  DateCreatedUtc { get; private set; }
        public Instant? DateUpdatedUtc { get; private set; }

        public Memo(string title, string body, Instant dateCreated)
        {
            Id = UnifiedId.NewId();
            Title = title;
            Body = body;
            DateCreatedUtc = dateCreated;
        }
    }
}

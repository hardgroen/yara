using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Yara.Services.Postings.DataContracts;

namespace Yara.Services.Postings.Controllers;

[ApiController]
// [Authorize]
[Route("api/[controller]")]
public class MemoController : ControllerBase
{
    private readonly ILogger<MemoController> _logger;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public MemoController(ILogger<MemoController> logger, IHttpContextAccessor httpContextAccessor)
    {
        _logger = logger;
        _httpContextAccessor = httpContextAccessor;
    }

    [HttpGet(Name = "GetMemos")]
    public IEnumerable<Memo> Get()
    {
        var bearear = this.HttpContext.Request.Headers.Authorization;
        return Enumerable.Range(1, 5).Select(index => new Memo
        {
            Id = index,
            Title = $"Title {index}",
            Body = "yep yep yadi yadi ..."
        })
        .ToArray();
    }
}

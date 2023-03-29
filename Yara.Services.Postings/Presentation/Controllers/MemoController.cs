using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Yara.Services.Postings.Application.Services;
using Yara.Services.Postings.Presentation.DataContracts.Commands;
using Yara.Services.Postings.Presentation.DataContracts.ViewModels;
using Yara.Services.Postings.Presentation.Infra.Authorization;

namespace Yara.Services.Postings.Presentation.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class MemoController : ControllerBase
{
    private readonly ILogger<MemoController> _logger;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly MemoService _memoService;

    public MemoController(
        ILogger<MemoController> logger,
        IHttpContextAccessor httpContextAccessor,
        MemoService memoService)
    {
        _logger = logger;
        _httpContextAccessor = httpContextAccessor;
        _memoService = memoService;
    }

    [HttpGet(Name = "GetMemos")]
    public async Task<IEnumerable<MemoViewModel>> Get()
    {
        var bearer = this.HttpContext.Request.Headers.Authorization;
        var memos = await _memoService.GetAsync();
        return memos.Select(m => new MemoViewModel
        {
            Id = m.Id,
            Title = m.Title,
            Body = m.Body,
            DateCreatedOrModified = m.DateModifiedUtc ?? m.DateCreatedUtc
        })
        .ToArray();
    }

    [HttpGet("{id}")]
    [Authorize(AuthorizePolicy.PostingsRead)]
    public async Task<ActionResult<MemoViewModel>> Get(string id)
    {
        var memo = await _memoService.GetAsync(id);

        if (memo is null)
        {
            return NotFound();
        }
        string publicId = memo.Id;
        return new MemoViewModel { Id = publicId, Body = memo.Body, Title = memo.Title };
    }

    [HttpPost]
    public async Task<IActionResult> Post(CreateMemo createMemo)
    {
        var memoId = await _memoService.CreateAsync(createMemo);

        return CreatedAtAction(nameof(Get), new { id = memoId });
    }

    [HttpPatch("{id}")]
    public async Task<IActionResult> Update(string id, UpdateMemo updateMemo)
    {
        await _memoService.UpdateAsync(id, updateMemo);

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        var memo = await _memoService.GetAsync(id);

        if (memo is null)
        {
            return NotFound();
        }

        await _memoService.RemoveAsync(id);

        return NoContent();
    }
}

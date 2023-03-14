using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Yara.Services.Postings.Application.Services;
using Yara.Services.Postings.DataContracts.Commands;
using Yara.Services.Postings.DataContracts.ViewModels;

namespace Yara.Services.Postings.Controllers;

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
    public IEnumerable<MemoViewModel> Get()
    {
        var bearear = this.HttpContext.Request.Headers.Authorization;
        return Enumerable.Range(1, 5).Select(index => new MemoViewModel
        {
            Id = index,
            Title = $"Title {index}",
            Body = "yep yep yadi yadi ..."
        })
        .ToArray();
    }

    [HttpGet("{id")]
    public async Task<ActionResult<MemoViewModel>> Get(long id)
    {
        var memo = await _memoService.GetAsync(id);

        if (memo is null)
        {
            return NotFound();
        }

        return new MemoViewModel { Id = memo.Id, Body = memo.Body, Title = memo.Title };
    }

    [HttpPost]
    public async Task<IActionResult> Post(CreateMemo createMemo)
    {
        var memoId = await _memoService.CreateAsync(createMemo);

        return CreatedAtAction(nameof(Get), new { id = memoId });
    }

    [HttpPut("{id")]
    public async Task<IActionResult> Update(string id, Book updatedBook)
    {
        var book = await _booksService.GetAsync(id);

        if (book is null)
        {
            return NotFound();
        }

        updatedBook.Id = book.Id;

        await _booksService.UpdateAsync(id, updatedBook);

        return NoContent();
    }

    [HttpDelete("{id")]
    public async Task<IActionResult> Delete(string id)
    {
        var book = await _booksService.GetAsync(id);

        if (book is null)
        {
            return NotFound();
        }

        await _booksService.RemoveAsync(id);

        return NoContent();
    }
}

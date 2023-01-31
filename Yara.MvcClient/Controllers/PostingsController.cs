using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Yara.MvcClient.Models;
using Yara.MvcClient.Models.View;
using Yara.MvcClient.Services;

namespace Yara.MvcClient.Controllers;

public class PostingsController : Controller
{
    private readonly ILogger<HomeController> _logger;
    private readonly IMemoService _memoService;

    public PostingsController(ILogger<HomeController> logger, IMemoService memoService)
    {
        _logger = logger;
        _memoService = memoService;
    }

    public async Task<IActionResult> Index()
    {
        // var at = await HttpContext.GetUserAccessTokenAsync();
        var memos = await _memoService.GetAll();
        return View(
               new MemoListModel
               {
                   Memos = memos
               }
           );
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}

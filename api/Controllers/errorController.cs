using System.Threading.Tasks;
using api.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using api.Dtos;
using Microsoft.AspNetCore.Identity;
using api.Models;
using Microsoft.AspNetCore.Diagnostics;

namespace api.Controllers
{
  
    public class errorController : Controller
    {
       [Route("Error/{statusCode}")]
public IActionResult HandleErrorCode(int statusCode)
{
    var statusCodeData = HttpContext.Features.Get<IStatusCodeReExecuteFeature>();

    switch (statusCode)
    {
        case 404:
            ViewBag.ErrorMessage = "Sorry the page you requested could not be found";
            ViewBag.RouteOfException = statusCodeData.OriginalPath;
            break;
        case 500:
            ViewBag.ErrorMessage = "Sorry something went wrong on the server";
            ViewBag.RouteOfException = statusCodeData.OriginalPath;
            break;
    }

    return View();
}
     
    }
}
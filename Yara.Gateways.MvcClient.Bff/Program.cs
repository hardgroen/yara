using Serilog;
using Yara.Gateways.MvcClient.Bff;

Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .CreateBootstrapLogger();

Log.Information("Starting up MvcClient Bff");

try
{
    var builder = WebApplication.CreateBuilder(args);
    builder.ConfigureServices();
    var app = await builder.ConfigurePipeline();

    app.Run();

}
catch(Exception ex)
{
    Log.Fatal(ex, "Unhandled exception");
}
finally
{
    Log.Information("Shut down complete");
    Log.CloseAndFlush();
}




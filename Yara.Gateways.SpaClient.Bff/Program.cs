using Serilog;
using Yara.Gateways.SpaClient.Bff;

Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .CreateBootstrapLogger();

Log.Information("Starting up SpaClient Bff");

try
{
    var builder = WebApplication.CreateBuilder(args);
    var app = builder.ConfigureServices()
            .ConfigurePipeline();

    app.Run();

}
catch (Exception ex)
{
    Log.Fatal(ex, "Unhandled exception");
}
finally
{
    Log.Information("Shut down complete");
    Log.CloseAndFlush();
}
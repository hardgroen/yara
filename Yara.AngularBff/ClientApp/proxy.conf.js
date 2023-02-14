// const HttpsProxyAgent = require('https-proxy-agent');

// const { env } = require('process');

// const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
//   env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'http://localhost:48935';

// /*
//  * API proxy configuration.
//  * This allows you to proxy HTTP request like `http.get('/api/stuff')` to another server/port.
//  * This is especially useful during app development to avoid CORS issues while running a local server.
//  * For more details and options, see https://angular.io/guide/build#using-corporate-proxy
//  */
// const proxyConfig = [
//   {
//     context: '/api',
//     pathRewrite: { '^/api': '' },
//     target: 'https://api.chucknorris.io',
//     changeOrigin: true,
//     secure: false
//   }
// ];

// /*
//  * Configures a corporate proxy agent for the API proxy if needed.
//  */
// function setupForCorporateProxy(proxyConfig) {
//   if (!Array.isArray(proxyConfig)) {
//     proxyConfig = [proxyConfig];
//   }

//   const proxyServer = process.env.http_proxy || process.env.HTTP_PROXY;
//   let agent = null;

//   if (proxyServer) {
//     console.log(`Using corporate proxy server: ${proxyServer}`);
//     agent = new HttpsProxyAgent(proxyServer);
//     proxyConfig.forEach(entry => { entry.agent = agent; });
//   }

//   return proxyConfig;
// }

// module.exports = setupForCorporateProxy(proxyConfig);

const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
  env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'http://localhost:7160';

const PROXY_CONFIG = [
  {
    context: ["/api", "/todos", "/bff", "/signin-oidc", "/signout-callback-oidc"],
    target: target,
    secure: false,
    headers: {
      Connection: 'Keep-Alive'
    }
  }
]

module.exports = PROXY_CONFIG;


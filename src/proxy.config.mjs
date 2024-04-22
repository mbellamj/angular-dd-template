import { config } from 'dotenv';
import HttpsProxyAgent from 'https-proxy-agent';

config();

console.log('Backend URL =', process.env['AVA_API_URL']);

const proxyConfig = [
  {
    context: '/ava-api',
    pathRewrite: { '^/ava-api': '' },
    target: process.env['AVA_API_URL'] ?? 'http://localhost:8080',
    secure: false,
    logLevel: 'debug',
  },
];

function setupCorporateProxy(proxyConfig) {
  const proxyServer = process.env.http_proxy || process.env.HTTP_PROXY;
  if (proxyServer) {
    console.log('Using corporate proxy server: ' + proxyServer);
    const agent = new HttpsProxyAgent(proxyServer);

    for (const entry of proxyConfig) {
      entry.agent = agent;
    }
  }

  return proxyConfig;
}

export default setupCorporateProxy(proxyConfig);

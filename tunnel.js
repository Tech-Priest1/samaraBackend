const localtunnel = require('localtunnel');

(async () => {
  const tunnel = await localtunnel({ port: 5000, subdomain: 'mobiexpress' });

  console.log(` LocalTunnel rodando: ${tunnel.url}/api`);

  tunnel.on('close', () => {
    console.log('Tunnel fechado');
  });
})();

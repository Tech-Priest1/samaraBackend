const localtunnel = require('localtunnel');

const startTunnel = async () => {
  try {
    const tunnel = await localtunnel({ port: 5000, subdomain: 'mobiexpress' });

    console.log(` LocalTunnel ativo: ${tunnel.url}/api`);

    tunnel.on('close', () => {
      console.warn('Tunnel fechado. Tentando reconectar...');
      reconnect();
    });

    tunnel.on('error', (err) => {
      console.error(' Erro no tunnel:', err.message);
      reconnect();
    });
  } catch (err) {
    console.error(' Falha ao iniciar tunnel:', err.message);
    reconnect();
  }
};

const reconnect = () => {
  setTimeout(() => {
    startTunnel();
  }, 5000); // tenta novamente após 5s
};

startTunnel();

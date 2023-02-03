const Hapi = require('@hapi/hapi');

const init = () => {
  const server = Hapi.server({
    port: 5000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.start();
  console.log(`Server running on ${server.info.uri}`);
};

init();

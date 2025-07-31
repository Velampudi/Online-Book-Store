// server.js
import { createServer } from 'node:http';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const start = async () => {
  const jsonServer = await import('json-server');
  const server = jsonServer.create();
  const router = jsonServer.router(path.join(__dirname, 'db.json'));
  const middlewares = jsonServer.defaults();

  server.use(middlewares);
  server.use(router);

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`JSON Server is running on port ${PORT}`);
  });
};

start();



import { router } from './router.js';
import http from 'node:http';
import { GETController, POSTController, OPTIONSController } from './controller.js';
import { sendJsonError, parseJSON } from './helpers.js';
import process from 'node:process';
import { safeJSON } from './utils.js';

const PORT = 3500;

router.createRoute('/', 'GET', GETController);
router.createRoute('/post', 'POST', POSTController);
router.createRoute('/options', 'OPTIONS', OPTIONSController);

const processedContentTypes = {
  'text/plain': (text) => text,
  'text/html': (text) => text,
  'application/json': (json) => safeJSON(json, {}),
  'application/x-www-form-urlencoded': (data) => {
    return Object.fromEntries(new URLSearchParams(data));
  },
};

const server = http
  .createServer(async (req, res) => {
    const url = new URL(req.url || '/', `https://${req.headers.host}`);
    const handlerRouter = router.getHandler(url.pathname, req.method);
    if (!handlerRouter) return sendJsonError(res, 404, 'Not Found');

    let payload = {};
    let rawRequest = '';
    for await (const chunk of req) {
      rawRequest += chunk;
    }
    if (req.headers['content-type']) {
      const contentType = req.headers['content-type']?.split(';')[0];
      if (processedContentTypes[contentType]) {
        payload = processedContentTypes[contentType](rawRequest);
      }
    }
    try {
      await handlerRouter(req, Object.assign(res, parseJSON), url, payload, rawRequest);
    } catch (error) {
      console.error(error);
      sendJsonError(res, 500, 'Server Error');
    }
  })
  .listen(PORT, () => console.log(`Server listening on port ${PORT}`));

server.on('clientError', (err, socket) => {
  console.error(err);
  socket.end('Bad Request');
});

process.on('SIGINT', () => {
  server.close((error) => {
    if (error) {
      console.error(error);
      process.exit(1);
    }
  });
});

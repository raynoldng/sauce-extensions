import Router from 'koa-router';
import { share } from '../db';
import WebSocketJSONStream from 'websocket-json-stream';

const router = new Router();

router.get('/ws', async (ctx) => {
  ctx.websocket.on('connection', function(ws, req){
    const stream = new WebSocketJSONStream(ws);
    share.listen(stream);
  });
});

export default router;

import redis from 'redis';
import SharedbAceRWControl from 'sharedb-ace-rw-control/server';
import Router from 'koa-router';
const router = new Router();

const REDIS_URL = "redis://localhost:6379/1";

function pubSubInit(obj, ctx) {
  const pub = redis.createClient(REDIS_URL);
  const sub = redis.createClient(REDIS_URL);
  obj.subscribe(ctx, pub, sub);
}

router.get('/ws', async (ctx) => {
  const pub = redis.createClient(REDIS_URL);
  const sub = redis.createClient(REDIS_URL);
  
  ctx.websocket.on("error", function(err) {
    console.log(err);
  });

  pubSubInit(SharedbAceRWControl, ctx); 
});

export default router;

import SharedbAceRWControl from 'sharedb-ace-rw-control/server';
import Router from 'koa-router';
const router = new Router();

const REDIS_URL = "redis://localhost:6379/1";

function pubSubInit(obj, ctx) {
  obj.subscribe(ctx);
}

router.get('/ws', async (ctx) => {
  ctx.websocket.on("error", function(err) {
    console.log(err);
  });

  const rw = SharedbAceRWControl(REDIS_URL);
  rw(ctx);
});

export default router;

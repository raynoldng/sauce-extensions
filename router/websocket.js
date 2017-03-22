import redis from 'redis';
import Router from 'koa-router';
const router = new Router();

const REDIS_URL = "redis://localhost:6379/1";

router.get('/ws', async (ctx) => {
  ctx.websocket.on("error", function(err) {
    console.log(err);
  });

  ctx.websocket.on("message", function(message) {
    if (message == "server:init") {
      const sub = redis.createClient(REDIS_URL);
      sub.on("message", function(channel, message) {
        ctx.websocket.send(channel+":"+message);
      });
      sub.subscribe("access-control");      
    }
  });
});

export default router;

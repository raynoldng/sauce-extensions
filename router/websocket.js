import redis from 'redis';

import Router from 'koa-router';
const router = new Router();

const REDIS_URL = "redis://localhost:6379/1";

router.get('/ws', async (ctx) => {
  ctx.websocket.on("error", function(err) {
    console.log(err);
  });
  
  ctx.websocket.on("message", function(message) {
    let pub;
    let sub;
    switch(message) {
    case "server:init":
      pub = redis.createClient(REDIS_URL);
      sub = redis.createClient(REDIS_URL);

      sub.on("message", function(channel, message) {
        ctx.websocket.send(channel+":"+message);
      }); 
      sub.subscribe("setReadOnly");
      break;
    case "setReadOnly:true":
      pub = redis.createClient(REDIS_URL);
      pub.publish("setReadOnly", "true");
      break;
    default:
      console.warn("Unhandled event: " + message);
    } 
  });
});

export default router;

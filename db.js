import ShareDB from 'sharedb';
import ShareDBRedis from 'sharedb-redis-pubsub';

const share = new ShareDB({
  pubsub: new ShareDBRedis("redis://localhost:6379/3"),
});

export default share;

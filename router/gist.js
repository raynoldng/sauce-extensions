import Router from 'koa-router';
import share from '../db';
import uuid from 'uuid/v1';

const router = new Router();

let latest = null;

async function newGist() {
  const id = uuid();
  const conn = share.connect();
  const doc = conn.get('codepad', id);
  await new Promise( (resolve, reject) => {
    doc.create({
      "code": "function() {hello;}",
      "testcases": "hellotest"
    }, function(err) {
      if (err) reject(err);
      latest = id;
      resolve();
    }); 
  });

  return id;
}

// For testing only
newGist();

// Gists
router.post('/gists/new', async (ctx) => {
  const id = await newGist();
  ctx.body = {
    id,
  }; 
});

router.get('/gists/latest', async (ctx) => {
  ctx.body = {id: latest};
});

export default router;

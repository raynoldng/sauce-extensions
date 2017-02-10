import Router from 'koa-router';
import Gist from '../models/gist';

const router = new Router();

// Gists
router.get('/gists', async (ctx) => {
  await Gist.find({}, (err, gists) => {
    if (err) throw err;
    ctx.body = {
      gists,
    };
  });
});

router.post('/gists/new', async (ctx, next) => {
  try {
    const gist = new Gist({});
    await gist.save();
    const id = gist._id;
    const gistId = gist.gistId;
    ctx.body = {
      id,
      gistId
    };
  } catch (e) {
    next(e);
  }
});

router.get('/gists/latest', async (ctx) => {
  await Gist.findOne().sort({ field: 'asc', _id: -1 }).exec( (err, gist) => {
    if (err) throw err;
    ctx.body = gist;
  });
});

export default router;

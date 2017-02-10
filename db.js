import ShareDB from 'sharedb';
import shareDBMongo from 'sharedb-mongo';

import mongoose from 'mongoose';

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/sauce';

export const conn = mongoose.connect(url);

export const share = new ShareDB({
  db: shareDBMongo(url),
});

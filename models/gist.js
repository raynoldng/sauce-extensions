import mongoose from 'mongoose';
import { conn, share } from '../db';

const Schema = mongoose.Schema;

const gistSchema = new Schema({
  // owner: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  // participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  gistId: Schema.Types.ObjectId,
}, {
  timestamps: true,
});

gistSchema.pre('save', async function presave(next) {
  if (this.isNew) {
    const id = mongoose.Types.ObjectId();
    const shareconn = share.connect();
    const doc = shareconn.get('codepad', id);
    doc.create({
      "code": "function() {hello;}",
      "testcases": "hellotest"
    });

    this.gistId = id;
  }
  next();
});

export default conn.model('Gist', gistSchema);

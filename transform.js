const { Transform } = require('stream');
const parse = require('./parser');

module.exports = new Transform({
  encoding: 'utf-8',
  transform(chunk, encoding, callback) {
    callback(null, parse(chunk.toString()).toAgoraFormat() + '\n');
  }
});
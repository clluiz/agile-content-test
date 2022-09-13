const minhaCDNRecordParser = require('./parser');
const MinhaCDNRecord = require('./record');

test('minhaCDNParser should build an object width all record parts', () => {
  expect(minhaCDNRecordParser('312|200|HIT|"GET /robots.txt HTTP/1.1"|100.2')).toEqual(new MinhaCDNRecord(
    'MINHA CDN',
    '100.2',
    'GET',
    '200',
    '/robots.txt',
    '312',
    'HIT',
  ))
})
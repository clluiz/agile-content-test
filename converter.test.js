const converter = require('./converter');
const MinhaCDNRecord = require('./record');

test('time taken equal .5 must be rounded to upper integer', () => {
  expect(new MinhaCDNRecord(
    'MINHA CDN',
    '344.5',
    'GET',
    '200',
    '/robots.txt',
    '312',
    'HIT',
  ).toAgoraFormat()).toBe('"MINHA CDN" GET 200 /robots.txt 345 312 HIT')
})


test('time taken above .5 must be rounded to upper integer', () => {
  expect(new MinhaCDNRecord(
    'MINHA CDN',
    '255.9',
    'GET',
    '200',
    '/robots.txt',
    '199',
    'HIT',
  ).toAgoraFormat()).toBe('"MINHA CDN" GET 200 /robots.txt 256 199 HIT')
})

test('time taken under .5 must be rounded to the bottom integer', () => {
  expect(new MinhaCDNRecord(
    'MINHA CDN',
    '142.4',
    'GET',
    '404',
    '/robots.txt',
    '312',
    'HIT'
  ).toAgoraFormat()).toBe('"MINHA CDN" GET 404 /robots.txt 142 312 HIT')
})
const MinhaCDNRecord = require("./record");

module.exports = function parseMinhaCDNLine(minhaCDNLogLine) {
  const [responseSize, statusCode, cacheStatus, uriPath, timeTaken] = minhaCDNLogLine.split('|')
  const [httpMethod, url] = uriPath.split(' ')

  return new MinhaCDNRecord(
    'MINHA CDN',
    timeTaken,
    httpMethod.replace(/\"/, ''),
    statusCode,
    url,
    responseSize,
    cacheStatus,
  )
}

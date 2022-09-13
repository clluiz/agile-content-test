class MinhaCDNRecord {
  constructor(provider, timeTaken, httpMethod, statusCode, url, responseSize, cacheStatus) {
    this.provider = provider;
    this.timeTaken = timeTaken;
    this.httpMethod = httpMethod;
    this.statusCode = statusCode;
    this.url = url;
    this.responseSize = responseSize;
    this.cacheStatus = cacheStatus;
  }

  toAgoraFormat() {
    const timeTaken = Math.round(this.timeTaken);
    return `"${this.provider}" ${this.httpMethod} ${this.statusCode} ${this.url} ${timeTaken} ${this.responseSize} ${this.cacheStatus}`;
  }
}

module.exports = MinhaCDNRecord;
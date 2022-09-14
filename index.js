const https = require('https');
const http = require('http');
const fs = require('fs');

const path = require('path');
const format = require('date-fns/format');
const byline = require('byline');
const transformer = require('./transform')

const sourceUrl = process.argv[2]
const targetPath = process.argv[3]

if(!sourceUrl)
  throw new Error('You must specify the source url.');

if(!targetPath)
  throw new Error('You must pass a valid path for target.');

const request = sourceUrl.startsWith('https') ? https : http;

request.get(sourceUrl, response => {

  if(response.statusCode === 404)
    throw new Error(`${sourceUrl} was not found.`);
  
  const filename = path.posix.basename(targetPath);
  const folderName = path.dirname(targetPath);

  try {
    fs.mkdirSync(folderName);
  } catch {
    console.info(`INFO: ${folderName} folder already exists. Skipping folder creation.`);
  }

  const agoraLogWriter = fs.createWriteStream(path.resolve(process.cwd(), folderName, filename), { flags: 'w', encoding: 'utf-8' });
    
  const today = new Date();
  agoraLogWriter.write("#Version: 1.0\n");
  agoraLogWriter.write(`#Date: ${format(today, 'dd/MM/yyyy HH:mm:ss')}\n`);
  agoraLogWriter.write("#Fields: provider http-method status-code uri-path time-taken response-size cache-status\n");

  byline(response, {encoding: 'utf8'})
    .pipe(transformer)
    .pipe(agoraLogWriter);
    
  response.on('end', () => console.log('Conversion finished.'))
});

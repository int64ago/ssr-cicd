const fetch = require('node-fetch');
const https = require('https');

const agent = new https.Agent({
  rejectUnauthorized: false,
});

const customFetch = (method, url, body = {}) => {
  return fetch(`https://${process.env.HOST}${url}`, {
    method,
    body: method.toLocaleLowerCase() === 'get' ? undefined : JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.TOKEN}`,
    },
    agent,
  }).then(res => res.json());
};

exports.get = (url) => customFetch('GET', url);

exports.post = (url, body) => customFetch('POST', url, body);

const http = require('http');

const data = JSON.stringify({
  name: 'Nabil Test Email',
  email: 'test@nabilportfolio.com',
  message: 'This is a direct test email sent at ' + new Date().toISOString() + '. If you receive this email at nabilaminhridoy@gmail.com, then the email system is working correctly. Please check your inbox now.'
});

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/contact',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  console.log(`Headers: ${JSON.stringify(res.headers)}`);
  
  let responseData = '';
  res.on('data', (chunk) => {
    responseData += chunk;
  });
  
  res.on('end', () => {
    console.log('Response:', responseData);
  });
});

req.on('error', (error) => {
  console.error('Error:', error);
});

req.write(data);
req.end();
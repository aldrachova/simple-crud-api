const dotenv = require('dotenv').config();
const http = require('http');
const { getPersons, getPersonById, createPerson, updatePerson } = require('./controller/person-controller');

const port = process.env.PORT;

const server = http.createServer((request, response) => {
  if (request.url === '/person' && request.method === 'GET') {
    getPersons(request, response);
  } else if (request.url.match(/\/person\/([a-z0-9-]+)/) && request.method === 'GET') {
    const id = request.url.split('/')[2];
    getPersonById(request, response, id);
  } else if (request.url === '/person' && request.method === 'POST') {
    createPerson(request, response);
  } else if (request.url.match(/\/person\/([a-z0-9-]+)/) && request.method === 'PUT') {
    const id = request.url.split('/')[2];
    updatePerson(request, response, id);
  } else {
    console.log(request.url, request.method);
    response.writeHead(404, { 'Content-Type': 'application/json'});
    response.end(JSON.stringify({ message: 'Route Not Found'}));
  }
});


server.listen(port, () => {
  console.log(`Server is running on PORT: ${port}`);
});
const uuid = require('uuid');
const fs = require('fs');

const isValidId = (id) => {
  return uuid.validate(id);
}

const writeDataToJSON = (json, data) => {
  fs.writeFileSync(json, JSON.stringify(data), 'utf-8', (err) => {});
}

const getBodyData = (request) => {
  return new Promise((resolve, reject) => {
    try {
      let data = '';

      request.on('data', (chunk) => {
        data += chunk.toString();
      });

      request.on('end', () => {
        resolve(data);
      });
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  isValidId,
  writeDataToJSON,
  getBodyData
}

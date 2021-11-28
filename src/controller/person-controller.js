const Person = require('../model/person-model');
const { isValidId } = require('../validation');


// GET /person: server return status code 200 and all persons
const getPersons = async (request, response) => {
  try {
    const persons = await Person.getAll();
    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify(persons));
  } catch (error) {
    // if error server return status code 500 and message
    response.statusCode = 500;
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify({ message: 'Unexpected server error has occurred'}));
  }
}

// GET /person/{personId}:
const getPersonById = async (request, response, id) => {
  try {
    // server returns status code 400 and message if personId is not valid
    if (!isValidId(id)) {
      response.statusCode = 400;
      response.setHeader('Content-Type', 'application/json');
      response.end(JSON.stringify({ message: `Id: ${id} is not valid`}))
    } else {
      const person = await Person.getById(id);
      // server returns status code 404 and message if person is not found
      if (!person) {
        response.statusCode = 404;
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify({ message: `Person with id: ${id} is not found`}));
      } else {
        // server returns status code 200 and person
        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify(person));
      }
    } 
  } catch (error) {
    // if error server return status code 500 and message
    console.log(error)
    response.statusCode = 500;
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify({ message: 'Unexpected server error has occurred'}));
  }
}

module.exports = {
  getPersons,
  getPersonById
}
const Person = require('../model/person-model');
const { isValidId, getBodyData } = require('../utils/utils');

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
      response.end(JSON.stringify({ message: `Id = ${id} is not valid (not uuid)`}))
    } else {
      const person = await Person.getById(id);
      // server returns status code 404 and message if person is not found
      if (!person) {
        response.statusCode = 404;
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify({ message: `Person with id = ${id} is not found`}));
      } else {
        // server returns status code 200 and person
        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify(person));
      }
    } 
  } catch (error) {
    // if error server return status code 500 and message
    response.statusCode = 500;
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify({ message: 'Unexpected server error has occurred'}));
  }
}

// POST /person
const createPerson = async (request, response) => {
  try {
    const bodyData = await getBodyData(request);
    const { name, age, hobbies } = JSON.parse(bodyData);
    const person = {name, age, hobbies};
    // server returns status code 404 and message if required field is missing
    if (!person.name) {
      response.statusCode = 404;
      response.setHeader('Content-Type', 'application/json');
      response.end(JSON.stringify({ message: 'Name is required field. Please enter person\'s name'}));
    } else if (!person.age) {
      response.statusCode = 404;
      response.setHeader('Content-Type', 'application/json');
      response.end(JSON.stringify({ message: 'Age is required field. Please enter person\'s age'}));
    } else if (!person.hobbies) {
      response.statusCode = 404;
      response.setHeader('Content-Type', 'application/json');
      response.end(JSON.stringify({ message: 'Hobbies is required field. Please enter person\'s hobbies. You can use empty array if person has no hobbies'}));
    } else {
      // server return status code 201 and created person
      const newPerson = await Person.create(person);
      response.statusCode = 201;
      response.setHeader('Content-Type', 'application/json');
      response.end(JSON.stringify(newPerson));
    }
  } catch (error) {
    // if error server return status code 500 and message
    response.statusCode = 500;
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify({ message: 'Unexpected server error has occurred'}));
  }
}

// PUT /person/{personId}
const updatePerson = async (request, response, id) => {
  try {
    // server returns status code 400 and message if personId is not valid
    if (!isValidId(id)) {
      response.statusCode = 400;
      response.setHeader('Content-Type', 'application/json');
      response.end(JSON.stringify({ message: `Id = ${id} is not valid (not uuid)`}));
    } else {
      const person = await Person.getById(id);
      // server returns status code 404 and message if person is not found
      if (!person) {
        response.statusCode = 404;
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify({ message: `Person with id = ${id} is not found`}));
      } else {
        // server returns status code 200 and updated person
        const bodyData = await getBodyData(request);
        const { name, age, hobbies } = JSON.parse(bodyData);
        const personData = {
          name: name || person.name,
          age: age || person.age,
          hobbies: hobbies || person.hobbies
        };
        const updatedPerson = await Person.update(id, personData);
        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify(updatedPerson));
      }
    }
  } catch(error) {
    // if error server return status code 500 and message
    response.statusCode = 500;
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify({ message: 'Unexpected server error has occurred'}));
  }
}

// DELETE /person/${personId}
const deletePerson = async (request, response, id) => {
  try {
    // server returns status code 400 and message if personId is not valid
    if (!isValidId(id)) {
      response.statusCode = 400;
      response.setHeader('Content-Type', 'application/json');
      response.end(JSON.stringify({ message: `Id = ${id} is not valid (not uuid)`}));
    } else {
      const person = await Person.getById(id);
      // server returns status code 404 and message if person is not found
      if (!person) {
        response.statusCode = 404;
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify({ message: `Person with id = ${id} is not found`}));
      } else {
        // server returns status code 204
        await Person.deleteById(id);
        response.statusCode = 204;
        response.setHeader('Content-Type', 'application/json');
        response.end();
      }
    }
  } catch (error) {
    console.log(error)
    // if error server return status code 500 and message
    response.statusCode = 500;
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify({ message: 'Unexpected server error has occurred'}));
  }
}

module.exports = {
  getPersons,
  getPersonById,
  createPerson,
  updatePerson,
  deletePerson
}
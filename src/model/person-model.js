const persons = require('../data/persons');

const getAll = () => {
  return new Promise((resolve, reject) => {
    resolve(persons);
  });
};

const getById = (id) => {
  return new Promise((resolve, reject) => {
    const person =  persons.find((person) => person.id === id);
    resolve(person);
  });
}

module.exports = {
  getAll,
  getById
}

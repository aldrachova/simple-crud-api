let persons = require('../data/persons');
const { v4: uuid4 } = require('uuid');
const { writeDataToJSON } = require('../utils/utils');
const path = require('path');

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

const create = (person) => {
  return new Promise((resolve, reject) => {
    const newPerson = {id: uuid4(), ...person};
    persons.push(newPerson);
    writeDataToJSON(path.join(__dirname, '../data/persons.json'), persons);
    resolve(newPerson);
  });
}

const update = (id, person) => {
  return new Promise((resolve, reject) => {
    const index = persons.findIndex((person) => person.id === id);
    persons[index] = {id, ...person};
    writeDataToJSON(path.join(__dirname, '../data/persons.json'), persons);
    resolve(persons[index]);
  });
}

const deleteById = (id) => {
  return new Promise ((resolve, reject) => {
    persons = persons.filter((person) => person.id !== id);
    writeDataToJSON(path.join(__dirname, '../data/persons.json'), persons);
    resolve();
  })
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById
}

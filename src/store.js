// In-memory data store. Stands in for the production database.

const appointments = new Map(); // id -> appointment
let nextId = 1;

function newId() {
  return nextId++;
}

function reset() {
  appointments.clear();
  nextId = 1;
}

module.exports = { appointments, newId, reset };

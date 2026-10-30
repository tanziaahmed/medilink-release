// Appointment booking and cancellation.

const store = require('./store');
const reminders = require('./reminders');

function book(patient, clinic, startsAt) {
  const taken = [...store.appointments.values()].some(
    (a) => a.clinic === clinic && a.startsAt === startsAt && a.status !== 'CANCELLED'
  );
  if (taken) {
    throw new Error(`Slot at ${clinic} starting ${startsAt} is already booked`);
  }
  const appointment = {
    id: store.newId(),
    patient,
    clinic,
    startsAt,
    status: 'BOOKED',
  };
  store.appointments.set(appointment.id, appointment);
  reminders.scheduleReminder(appointment);
  return appointment;
}

function cancel(id) {
  const appointment = store.appointments.get(id);
  if (!appointment) {
    throw new Error(`Appointment ${id} not found`);
  }
  appointment.status = 'CANCELLED';
  return appointment;
}

function get(id) {
  return store.appointments.get(id);
}

module.exports = { book, cancel, get };

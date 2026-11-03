// Appointment booking and cancellation.

const store = require('./store');
const reminders = require('./reminders');

function book(patient, clinic, startsAt) {
  const appointment = {
    id: store.newId(),
    patient,
    clinic,
    startsAt,
    status: 'BOOKED',
  };
  const slotTaken = [...store.appointments.values()].some(
  (a) => a.clinic === clinic && a.startsAt === startsAt && a.status === 'BOOKED'
);
if (slotTaken) {
  throw new Error('This slot is already booked');
}

  
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

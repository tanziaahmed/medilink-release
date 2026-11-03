// Appointment booking and cancellation.

const store = require('./store');
const reminders = require('./reminders');
const DAY_MS = 24 * 60 * 60 * 1000;


function book(patient, clinic, startsAt) {
  if (startsAt <= Date.now()) {
    throw new Error('Cannot book an appointment in the past');
  }
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

function reschedule(id, newStartsAt) {
  const appointment = store.appointments.get(id);
  if (!appointment) {
    throw new Error(`Appointment ${id} not found`);
  }
  if (appointment.status !== 'BOOKED') {
    throw new Error(`Appointment ${id} is not booked`);
  }
  if (appointment.startsAt - Date.now() < DAY_MS) {
    throw new Error('Appointments less than 24 hours away cannot be rescheduled');
  }
  for (const other of store.appointments.values()) {
    if (
      other.id !== id &&
      other.status === 'BOOKED' &&
      other.clinic === appointment.clinic &&
      other.startsAt === newStartsAt
    ) {
      throw new Error('This slot is already booked');
    }
  }

  // Drop the old reminder, move the appointment, queue a fresh reminder.
  const oldIndex = reminders.queue.findIndex((r) => r.appointmentId === id);
  if (oldIndex !== -1) {
    reminders.queue.splice(oldIndex, 1);
  }
  appointment.startsAt = newStartsAt;
  reminders.scheduleReminder(appointment);
  return appointment;
}

function get(id) {
  return store.appointments.get(id);
}

module.exports = { book, cancel, reschedule, get };

// Issue #2: rescheduling an appointment.
const store = require('../src/store');
const reminders = require('../src/reminders');
const appointments = require('../src/appointments');

const HOUR = 60 * 60 * 1000;

beforeEach(() => {
  store.reset();
  reminders.reset();
});

test('rescheduling moves the time and frees the old slot', () => {
  const oldTime = Date.now() + 48 * HOUR;
  const newTime = Date.now() + 72 * HOUR;
  const appt = appointments.book('patient-1', 'clinic-A', oldTime);

  appointments.reschedule(appt.id, newTime);
  expect(appointments.get(appt.id).startsAt).toBe(newTime);

  // The old slot is free again, so another appointment can move into it.
  const other = appointments.book('patient-3', 'clinic-A', Date.now() + 96 * HOUR);
  expect(() => appointments.reschedule(other.id, oldTime)).not.toThrow();
});

test('exactly one reminder remains, for the new time', () => {
  const newTime = Date.now() + 72 * HOUR;
  const appt = appointments.book('patient-1', 'clinic-A', Date.now() + 48 * HOUR);

  appointments.reschedule(appt.id, newTime);
  const forAppt = reminders.queue.filter((r) => r.appointmentId === appt.id);
  expect(forAppt).toHaveLength(1);
  expect(forAppt[0].sendAt).toBe(newTime - reminders.REMINDER_LEAD_MS);
});

test('a taken slot is rejected and the original booking is kept', () => {
  const takenTime = Date.now() + 72 * HOUR;
  const originalTime = Date.now() + 48 * HOUR;
  appointments.book('patient-2', 'clinic-A', takenTime);
  const appt = appointments.book('patient-1', 'clinic-A', originalTime);

  expect(() => appointments.reschedule(appt.id, takenTime)).toThrow('This slot is already booked');
  expect(appointments.get(appt.id).startsAt).toBe(originalTime);
});

test('an appointment less than 24 hours away cannot be rescheduled', () => {
  const soon = Date.now() + 12 * HOUR;
  const appt = appointments.book('patient-1', 'clinic-A', soon);

  expect(() => appointments.reschedule(appt.id, Date.now() + 72 * HOUR)).toThrow();
  expect(appointments.get(appt.id).startsAt).toBe(soon);
});

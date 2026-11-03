// Issue #9: tests for the book/cancel rules.

const store = require('../src/store');
const reminders = require('../src/reminders');
const appointments = require('../src/appointments');

const HOUR = 60 * 60 * 1000;

beforeEach(() => {
  store.reset();
  reminders.reset();
});

test('booking stores patient, clinic and time with status BOOKED', () => {
  const startsAt = Date.now() + 48 * HOUR;
  const appt = appointments.book('patient-1', 'clinic-A', startsAt);
  const saved = appointments.get(appt.id);
  expect(saved.patient).toBe('patient-1');
  expect(saved.clinic).toBe('clinic-A');
  expect(saved.startsAt).toBe(startsAt);
  expect(saved.status).toBe('BOOKED');
});

test('cancelling sets status to CANCELLED', () => {
  const appt = appointments.book('patient-1', 'clinic-A', Date.now() + 48 * HOUR);
  appointments.cancel(appt.id);
  expect(appointments.get(appt.id).status).toBe('CANCELLED');
});

test('cancelling an unknown id throws', () => {
  expect(() => appointments.cancel(999)).toThrow('Appointment 999 not found');
});

test('booking a time in the past is rejected', () => {
  expect(() => appointments.book('patient-1', 'clinic-A', Date.now() - HOUR)).toThrow();
  expect(store.appointments.size).toBe(0);
});

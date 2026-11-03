// Regression tests for the incident: cancelled patients still received reminders.
const store = require('../src/store');
const reminders = require('../src/reminders');
const appointments = require('../src/appointments');

const HOUR = 60 * 60 * 1000;

beforeEach(() => {
  store.reset();
  reminders.reset();
});

test('no reminder is sent for an appointment cancelled after booking', () => {
  const startsAt = Date.now() + 48 * HOUR;
  const appt = appointments.book('patient-1', 'clinic-A', startsAt);
  appointments.cancel(appt.id);
  const sentCount = reminders.sendDue(startsAt - 23 * HOUR);
  expect(sentCount).toBe(0);
  expect(reminders.sent).toHaveLength(0);
});

test('the cancelled reminder is removed from the queue', () => {
  const startsAt = Date.now() + 48 * HOUR;
  const appt = appointments.book('patient-1', 'clinic-A', startsAt);
  appointments.cancel(appt.id);
  reminders.sendDue(startsAt - 23 * HOUR);
  expect(reminders.queue).toHaveLength(0);
});

test('a booked appointment still gets its reminder', () => {
  const startsAt = Date.now() + 48 * HOUR;
  appointments.book('patient-1', 'clinic-A', startsAt);
  expect(reminders.sendDue(startsAt - 23 * HOUR)).toBe(1);
});

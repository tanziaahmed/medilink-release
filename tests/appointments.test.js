const store = require('../src/store');
const reminders = require('../src/reminders');
const appointments = require('../src/appointments');

const HOUR = 60 * 60 * 1000;

beforeEach(() => {
  store.reset();
  reminders.reset();
});

test('booking creates an appointment with status BOOKED', () => {
  const appt = appointments.book('patient-1', 'clinic-A', Date.now() + 48 * HOUR);
  expect(appointments.get(appt.id).status).toBe('BOOKED');
});

test('cancelling sets status to CANCELLED', () => {
  const appt = appointments.book('patient-1', 'clinic-A', Date.now() + 48 * HOUR);
  appointments.cancel(appt.id);
  expect(appointments.get(appt.id).status).toBe('CANCELLED');
});

test('a reminder is sent 24 hours before a booked appointment', () => {
  const startsAt = Date.now() + 48 * HOUR;
  appointments.book('patient-1', 'clinic-A', startsAt);
  const sentCount = reminders.sendDue(startsAt - 23 * HOUR);
  expect(sentCount).toBe(1);
});

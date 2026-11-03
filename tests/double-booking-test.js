const store = require('../src/store');
const reminders = require('../src/reminders');
const appointments = require('../src/appointments');

const HOUR = 60 * 60 * 1000;

beforeEach(() => {
  store.reset();
  reminders.reset();
});

test('a second booking for the same clinic and time is rejected', () => {
  const startsAt = Date.now() + 48 * HOUR;
  appointments.book('patient-1', 'clinic-A', startsAt);
  expect(() => appointments.book('patient-2', 'clinic-A', startsAt)).toThrow(
    'This slot is already booked'
  );
});

test('a cancelled slot can be booked again', () => {
  const startsAt = Date.now() + 48 * HOUR;
  const first = appointments.book('patient-1', 'clinic-A', startsAt);
  appointments.cancel(first.id);
  const second = appointments.book('patient-2', 'clinic-A', startsAt);
  expect(second.status).toBe('BOOKED');
});

test('the same time at a different clinic is allowed', () => {
  const startsAt = Date.now() + 48 * HOUR;
  appointments.book('patient-1', 'clinic-A', startsAt);
  expect(appointments.book('patient-2', 'clinic-B', startsAt).status).toBe('BOOKED');
});

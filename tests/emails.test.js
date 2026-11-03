const emails = require('../src/emails');

const TORONTO = 'America/Toronto';

test('summer (EDT) time is shown in clinic local time', () => {
  const appt = { clinic: 'clinic-A', startsAt: Date.UTC(2026, 9, 30, 14, 0) };
  const text = emails.cancellationEmail(appt, TORONTO);
  expect(text).toContain('10:00');
  expect(text).toContain('EDT');
  
  expect(text).not.toContain('14:00');
});

test('winter (EST) time is shown in clinic local time', () => {

  const appt = { clinic: 'clinic-A', startsAt: Date.UTC(2026, 11, 1, 15, 0) };
  const text = emails.cancellationEmail(appt, TORONTO);
  expect(text).toContain('10:00');
  expect(text).toContain('EST');
});

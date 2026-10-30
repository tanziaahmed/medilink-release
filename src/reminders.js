// Reminder service.
// A reminder is queued when an appointment is booked and sent
// 24 hours before the appointment by a scheduled job.

const REMINDER_LEAD_MS = 24 * 60 * 60 * 1000;

const queue = []; // { appointmentId, patient, sendAt }
const sent = []; // log of reminders sent

function scheduleReminder(appointment) {
  queue.push({
    appointmentId: appointment.id,
    patient: appointment.patient,
    sendAt: appointment.startsAt - REMINDER_LEAD_MS,
  });
}

// Called by the scheduled job. Sends every reminder whose send time has passed.
function sendDue(now) {
  const due = queue.filter((r) => r.sendAt <= now);
  for (const reminder of due) {
    sent.push({ ...reminder, sentAt: now });
    queue.splice(queue.indexOf(reminder), 1);
  }
  return due.length;
}

function reset() {
  queue.length = 0;
  sent.length = 0;
}

module.exports = { scheduleReminder, sendDue, queue, sent, reset, REMINDER_LEAD_MS };

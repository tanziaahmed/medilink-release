// Reminder service.
// A reminder is queued when an appointment is booked and sent
// 24 hours before the appointment by a scheduled job.
const store = require('./store');

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

// Called by the scheduled job. Sends every reminder whose send time has passed,
// but only if the appointment is still booked at the moment of sending.
function sendDue(now) {
  const due = queue.filter((r) => r.sendAt <= now);
  let sentCount = 0;
  for (const reminder of due) {
    queue.splice(queue.indexOf(reminder), 1);
    const appointment = store.appointments.get(reminder.appointmentId);
    if (!appointment || appointment.status !== 'BOOKED') {
      continue; // cancelled or removed: drop the reminder instead of sending it
    }
    sent.push({ ...reminder, sentAt: now });
    sentCount++;
  }
  return sentCount;
}

function reset() {
  queue.length = 0;
  sent.length = 0;
}

module.exports = { scheduleReminder, sendDue, queue, sent, reset, REMINDER_LEAD_MS };

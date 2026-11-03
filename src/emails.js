function formatClinicTime(timestamp, timeZone) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  }).format(new Date(timestamp));
}

function cancellationEmail(appointment, clinicTimeZone) {
  const when = formatClinicTime(appointment.startsAt, clinicTimeZone);
  return `Your appointment at ${appointment.clinic} on ${when} has been cancelled.`;
}

module.exports = { formatClinicTime, cancellationEmail };

const dayFormatter = new Intl.DateTimeFormat('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })
const longDayFormatter = new Intl.DateTimeFormat('en-IN', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})
const timeFormatter = new Intl.DateTimeFormat('en-IN', { hour: 'numeric', minute: '2-digit' })

export const formatDay = (iso) => dayFormatter.format(new Date(iso))
export const formatLongDay = (iso) => longDayFormatter.format(new Date(iso))

const relativeTimeFormatter = new Intl.RelativeTimeFormat('en-IN', { numeric: 'auto' })

const startOfDay = (date) => {
  const day = new Date(date)
  day.setHours(0, 0, 0, 0)
  return day
}

// "today", "tomorrow", "yesterday", "in 5 days", "5 days ago".
// Compares calendar days in local time, so a session at 00:30 reads as
// tomorrow even when the user opens the page at 23:30.
export const formatRelativeDate = (iso) => {
  const target = startOfDay(new Date(iso))
  if (Number.isNaN(target.getTime())) return ''
  const today = startOfDay(new Date())
  const days = Math.round((target - today) / 86400000)
  return relativeTimeFormatter.format(days, 'day')
}
export const formatTime = (iso) => timeFormatter.format(new Date(iso))
export const formatTimeRange = (start, end) => `${formatTime(start)} to ${formatTime(end)}`

export const MODE_LABELS = {
  online: 'Online',
  in_person: 'In person',
  hybrid: 'Hybrid',
}

export function seatsLabel(session) {
  if (session.seats_left === null) return `${session.rsvp_count} going`
  if (session.seats_left === 0) return 'Full'
  return `${session.seats_left - 1} of ${session.capacity} seats left`
}

// <input type="datetime-local"> works with "YYYY-MM-DDTHH:mm" in local time.
export function toLocalInputValue(iso) {
  if (!iso) return ''
  const date = new Date(iso)
  const offset = date.getTimezoneOffset() * 60000
  return new Date(date.getTime() - offset).toISOString().slice(0, 16)
}

export const fromLocalInputValue = (value) => (value ? new Date(value).toISOString() : null)

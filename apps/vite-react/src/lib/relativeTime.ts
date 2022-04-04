export function relativeTime(target: Date, base = new Date()) {
  const timestampDifference = base.getTime() - target.getTime();
  const seconds = Math.floor(timestampDifference / 1000);

  let output = ``;
  if (seconds < 60) {
    // Less than a minute has passed:
    output = `${seconds} seconds ago`;
  } else if (seconds < 3600) {
    // Less than an hour has passed:
    output = `${Math.floor(seconds / 60)} minutes ago`;
  } else if (seconds < 86400) {
    // Less than a day has passed:
    output = `${Math.floor(seconds / 3600)} hours ago`;
  } else if (seconds < 2620800) {
    // Less than a month has passed:
    output = `${Math.floor(seconds / 86400)} days ago`;
  } else if (seconds < 31449600) {
    // Less than a year has passed:
    output = `${Math.floor(seconds / 2620800)} months ago`;
  } else {
    // More than a year has passed:
    output = `${Math.floor(seconds / 31449600)} years ago`;
  }
  return output;
}

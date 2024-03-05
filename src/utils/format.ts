import { format, register } from "timeago.js";
import koLocale from "timeago.js/lib/lang/ko";

register("ko", koLocale);

export function timeagoFormatDate(date: Date) {
  return format(date, "ko");
}

export function formatDate(dateString?: string | null) {
  if (!dateString) {
    console.error("date cannot empty");
    return null;
  }

  const date = new Date(dateString);
  const result = new Intl.DateTimeFormat("ko-KR").format(date);

  console.log("result: " + result);
  return result;
}

export function numberToTime(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formattedHours = hours === 0 ? "" : `${hours}:`;
  const formattedMinutes = padZero(minutes);
  const formattedSeconds = padZero(remainingSeconds);

  // const formatResult =

  return `${formattedHours}${formattedMinutes}:${formattedSeconds}`;
}

function padZero(number: number) {
  return String(number).padStart(2, "0");
}

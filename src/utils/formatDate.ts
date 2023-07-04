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

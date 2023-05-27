export default (dateTimeStr) => {
  function formatDate(dateStr) {
    const date = new Date(dateStr);
    const day = date.getDate();
    const daySuffix = getOrdinalSuffix(day);
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    const dayOfWeek = getDayOfWeek(date.getDay());
    return `${daySuffix} ${month} ${year} ${dayOfWeek}`;
  }

  function formatTime(dateStr) {
    const date = new Date(dateStr);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  function getOrdinalSuffix(day) {
    const suffixes = ["th", "st", "nd", "rd"];
    const suffix =
      day % 10 < 4 && (day % 100 < 11 || day % 100 > 13)
        ? suffixes[day % 10]
        : suffixes[0];
    return day + suffix;
  }

  function getDayOfWeek(dayIndex) {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return daysOfWeek[dayIndex];
  }

  const formattedDate = formatDate(dateTimeStr);
  const formattedTime = formatTime(dateTimeStr);

  return `${formattedDate} ${formattedTime}`;
};

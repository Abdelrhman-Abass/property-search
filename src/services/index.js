export const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {}).format(price);
};

export function blogFormatDate(dateString, locale = "en") {
  const date = new Date(dateString);
  // const today = new Date();

  // Check if the dateString is valid
  if (isNaN(date)) {
    console.error("Invalid date string:", dateString);
    return { day: "", month: "", fullDate: "" };
  }

  // Format the date for the specified locale
  const options = {
    year: "numeric",
    month: "long", // Full month name
    day: "numeric",
  };

  const fullDate = new Intl.DateTimeFormat(locale, options).format(date);
  const month = new Intl.DateTimeFormat(locale, { month: "long" }).format(date);
  const day = date.getDate();

  return {
    day,
    month,
    fullDate,
  };
}

export const isHTML = (str) => {
  const div = document.createElement("div");
  div.innerHTML = str?.trim();

  // If the created element has any child nodes, it's considered HTML
  return div.childNodes.length > 0 && div.childNodes[0].nodeType === 1;
};

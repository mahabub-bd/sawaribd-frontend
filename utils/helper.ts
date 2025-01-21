export const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const imagePath = (imageUrl: string): string => {
  return `${apiUrl}/${imageUrl}`;
};

function timeAgo(date: string) {
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    throw new Error("Invalid date");
  }

  const now = new Date();
  const diff = now.getTime() - parsedDate.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else if (days < 7) {
    return `${days} days ago`;
  } else if (weeks < 4) {
    return `${weeks} weeks ago`;
  } else if (months < 12) {
    return `${months} months ago`;
  } else {
    return `${years} years ago`;
  }
}

const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-");
}

function tagColor(index: number) {
  const colors = [
    "#991b1b", // Red
    "#047857", // Green
    "#9f1239", // Rose
    "#312e81", // Indigo
    "#b45309", // Amber
    "#1d4ed8", // Blue
    "#16a34a", // Emerald
    "#dc2626", // Red-Orange
    "#6b21a8", // Purple
  ];

  return colors[index] || colors[colors.length - 1];
}

export { formatDate, generateSlug, tagColor, timeAgo };

export const formatMessageTime = (date: Date): string => {
  const now = new Date();
  const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) {
    // Today, show time only
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else if (diffInDays === 1) {
    // Yesterday
    return 'Yesterday';
  } else if (diffInDays < 7) {
    // Within the last week, show day name
    return date.toLocaleDateString([], { weekday: 'short' });
  } else {
    // More than a week ago, show date
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  }
};
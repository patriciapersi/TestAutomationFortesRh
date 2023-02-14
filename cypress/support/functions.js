export function formatDate(actualDate, daysToAdd) {
    const date = actualDate;
    date.setDate(date.getDate() + daysToAdd);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
  
    return `${day}/${month}/${year}`;
  }
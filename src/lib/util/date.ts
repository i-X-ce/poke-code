export const displayDate = (date: string): string => {
  const d = new Date(date);
  return d.toLocaleDateString("ja-JP");
};

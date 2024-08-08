export const hexToRGBA = (hex: string, alpha: string) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `0px 2px 10px 0px rgba(${r}, ${g}, ${b}, ${alpha})`;
};

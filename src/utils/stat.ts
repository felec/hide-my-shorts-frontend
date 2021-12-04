export const roundDec = (num: number) => parseFloat(num.toFixed(2));

export const formatNum = (num: number): string => {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
  }
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }

  return num.toFixed(2);
};

export const isBetween = (n: number, a: number, b: number): boolean => {
  return (n - a) * (n - b) <= 0;
};

export const randNumber = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);

  const random = Math.random() * (max - min) + min;

  return Math.floor(random);
};

export const handleStat = (curr: number, prev: number) => {
  let isIncrease = true;

  if (curr < prev) isIncrease = false;

  const percent = ((curr - prev) / prev) * 100;

  const stat =
    isNaN(percent) || !isFinite(percent) ? '---' : percent.toFixed(2);

  return { stat, isIncrease };
};

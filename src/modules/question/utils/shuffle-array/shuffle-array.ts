export const shuffleArray = <T>(array: T[]): T[] => {
  array = [...array];

  for (let index = array.length - 1; index > 0; index--) {
    const newIndex = Math.floor(Math.random() * (index + 1));
    [array[index], array[newIndex]] = [array[newIndex], array[index]];
  }

  return array;
};

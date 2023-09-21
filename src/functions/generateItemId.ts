export const generateItemId = (existingIds: string[] = []) => {
  const min = 0;
  const max = 99999999;
  let randomNumber = 0;

  do {
    randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
  } while (existingIds.some(id => +id === randomNumber));

  if (randomNumber < 10000000) {
    const additionalZeros = max.toString().length - randomNumber.toString().length ;

    const newId = new Array(additionalZeros).fill('0', 0).join('') + randomNumber;

    return newId;
  }

  return randomNumber.toString();
}

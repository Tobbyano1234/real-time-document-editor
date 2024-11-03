export function getRandomBankCode() {
    const array = ["035", "232", "50515", "058"];
    const randomIndex = Math.floor(Math.random() * array.length);
    return [array[randomIndex]];
}

// const randomBankCode = getRandomItemFromArray();

// console.log(randomBankCode);

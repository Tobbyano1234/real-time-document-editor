export const generateDefaultPassword = () => {
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const specialChars = '!@#$%*()+:;,.?-';
    // const specialChars = '!@#$%^&*()_+{}[]:;<>,.?~\\/-';

    // Generate a random character from each character set
    const randomUppercaseChar = uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)];
    const randomLowercaseChar = lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)];
    const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];
    const randomSpecialChar = specialChars[Math.floor(Math.random() * specialChars.length)];

    // Concatenate the characters to form the password
    let defaultPassword = randomUppercaseChar + randomLowercaseChar + randomNumber + randomSpecialChar;

    // Add random characters to meet the minimum length requirement
    const minLength = 10;
    while (defaultPassword.length < minLength) {
        const randomCharSet = Math.floor(Math.random() * 4); // 0: uppercase, 1: lowercase, 2: number, 3: special
        let randomChar;
        switch (randomCharSet) {
            case 0:
                randomChar = uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)];
                break;
            case 1:
                randomChar = lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)];
                break;
            case 2:
                randomChar = numbers[Math.floor(Math.random() * numbers.length)];
                break;
            case 3:
                randomChar = specialChars[Math.floor(Math.random() * specialChars.length)];
                break;
        }
        defaultPassword += randomChar;
    }

    return defaultPassword;
}

// console.log(generateDefaultPassword());

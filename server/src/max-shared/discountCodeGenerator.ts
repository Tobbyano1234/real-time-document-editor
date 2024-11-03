export function generateDiscountCode(): string {
    const length = 8;
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters.charAt(randomIndex);
    }
    return code;
}

// Example usage
// const discountCode = generateDiscountCode();
// console.log(discountCode); // Output: "G6X2B9YZ"

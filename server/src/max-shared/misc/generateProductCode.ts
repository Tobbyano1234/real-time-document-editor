// Function to generate a random alphanumeric string
export const generateProductCode = () => {
    const length = 10;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    // const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return "GL-" + result;
}



import crypto from "crypto";

const generateSecretKey = () => {
    // Generate a secure random string of 32 bytes
    // const secretKey = crypto.randomBytes(32).toString("hex");
    // const secretKey = crypto.randomBytes(32).toString('base64');

    const { privateKey, publicKey } = crypto.generateKeyPairSync('ec', {
        namedCurve: 'P-256',
    });
    const secretKey = { privateKey, publicKey }

    return secretKey;
};

const secretKey = generateSecretKey();
console.log('Private Secret Key:', secretKey.privateKey, 'Public Secret Key:', secretKey.publicKey,);




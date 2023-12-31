//Educational-Use example adapted from https://www.sohamkamani.com/nodejs/rsa-encryption/
import crypto from "crypto"
import { config } from "dotenv"
//Expose .env file to process.env
config()

const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048
})

/** Example Encryption */
// This is the data we want to encrypt
const data = "my secret data";
console.log(`Original data: ${data}\n`)

const encryptedData = crypto.publicEncrypt(
    {
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha256",
    },
    // We convert the data string to a buffer using `Buffer.from`
    Buffer.from(data)
);

// The encrypted data is in the form of bytes, so we print it in base64 format
// so that it's displayed in a more readable form
console.log("encrypted data: ", encryptedData.toString("base64"));

/** Example Decryption */
const decryptedData = crypto.privateDecrypt(
    {
        key: privateKey,
        // In order to decrypt the data, we need to specify the
        // same hashing function and padding scheme that we used to
        // encrypt the data in the previous step
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha256",
    },
    encryptedData
);

// The decrypted data is of the Buffer type, which we can convert to a
// string to reveal the original data
console.log("\ndecrypted data: ", decryptedData.toString());



export class Utils {
  static AES_SECRET_KEY = 'miClaveAES1234567'.substring(0, 16);

  /*static decryptToken(encryptedJwt: string): string {
    try {
        const secretKey = Buffer.from(Utils.AES_SECRET_KEY, 'utf-8');
        const decipher = crypto.createDecipher('aes-128-ecb', secretKey);

        const encryptedBuffer = Buffer.from(encryptedJwt, 'base64');
        const decryptedBuffer = Buffer.concat([decipher.update(encryptedBuffer), decipher.final()]);

        return decryptedBuffer.toString('utf-8');
    } catch (e) {
        throw new Error('Error al descifrar el JWT: ' + e);
    } 
  } */
}

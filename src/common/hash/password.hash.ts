import * as bcrypt from 'bcrypt';

export class HashHelper {
  private static readonly SALT_ROUNDS = 12;

  /**
   * Hashes a plain text string
   * @param data - The string to hash (e.g., a password)
   */
  static encrypt(data: string): string{
    return bcrypt.hashSync(data, this.SALT_ROUNDS);
  }

  /**
   * Compares plain text with a hash to see if they match
   * @param data - Plain text input
   * @param encryptedData - The hashed string from the DB
   */
  static compare(data: string, encryptedData: string): boolean {
    return bcrypt.compareSync(data, encryptedData);
  }
}
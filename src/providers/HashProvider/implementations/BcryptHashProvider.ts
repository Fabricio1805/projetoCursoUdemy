import { compare, hash } from 'bcrypt';
import { IHashProvider } from '../models/IHashProvider';

export default class BcryptHashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }

  public async compareHash(payload: string, hased: string): Promise<boolean> {
    return compare(payload, hased);
  }
}

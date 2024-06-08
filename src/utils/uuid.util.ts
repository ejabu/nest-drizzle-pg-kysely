import { v4 as uuid4, v5 as uuid5, parse as uuidParse, validate } from 'uuid';

export default class UUID {
  static generate(): string {
    return uuid4();
  }

  static generateV5(namespace: string, key: string): string | undefined {
    if (!validate(namespace)) return undefined;
    return uuid5(key, uuidParse(namespace));
  }
}

import * as crypto from 'crypto';

export const hash = (buffer: Buffer): string => crypto.createHash('whirlpool')
    .update(buffer)
    .digest('hex');
import *  as crypto from 'crypto';

export class RNG {
    private static readonly _rng = new RNG();

    public static value(min: number, max: number): number {
        return RNG._rng.random(min, max);
    }

    private random(min: number, max: number): number {
        const delta = max - min;
        const params = this.calculateParameters(delta);
        const randomBytes = crypto.randomBytes(params.bytesNeeded);
        let randomValue = 0;
        for (let i = 0; i < params.bytesNeeded; i++) {
            randomValue |= (randomBytes[i] << (8 * i));
        }
        randomValue = randomValue & params.mask;
        if (randomValue <= delta) {
            return min + randomValue;
        } else {
            return this.random(min, max);
        }
    }

    private calculateParameters(delta: number): { bitsNeeded: number, bytesNeeded: number, mask: number } {
        let bitsNeeded = 0;
        let bytesNeeded = 0;
        let mask = 1;

        while (delta > 0) {
            if (bitsNeeded % 8 === 0) {
                bytesNeeded += 1;
            }

            bitsNeeded += 1;
            mask = mask << 1 | 1; /* 0x00001111 -> 0x00011111 */
            delta = delta >>> 1;  /* 0x01000000 -> 0x00100000 */
        }

        return { bitsNeeded, bytesNeeded, mask };
    }

}
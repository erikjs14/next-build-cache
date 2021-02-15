import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const read = promisify(fs.readFile);
const write = promisify(fs.writeFile);

interface CachedData<T> {
    [key: string]: {
        data: T;
        validUntil?: number;
    }
}

interface CacheConfig {
    scheduleTtl: boolean;
}

class Cache<T> {
    config: CacheConfig;
    filename: string;

    constructor(cacheFileName: string, config: Partial<CacheConfig> = {}) {
        this.filename = path.join(process.cwd(), cacheFileName);
        this.config = {
            scheduleTtl: true,
            ...config
        }
    }

    async put(key: string, val: T, ttl_ms: number | undefined = undefined): Promise<void> {
        let data: CachedData<T>;
        try {
            data = JSON.parse(await read(this.filename, 'utf8'));
        } catch (error) {
            data = {};
        }
        data[key] = {
            data: val,
            validUntil: ttl_ms ? new Date().getTime() + ttl_ms : undefined,
        }
        await write(this.filename, JSON.stringify(data), 'utf8');
        if (this.config.scheduleTtl && ttl_ms) this.scheduleTtl(key, ttl_ms);
    }

    async get(key: string): Promise<T|null> {
        try {
            const data = JSON.parse(await read(this.filename, 'utf8'))[key];

            if (data.validUntil) {
                if (new Date().getTime() >= data.validUntil) {
                    return null;
                }
            }

            return data.data;
        } catch (error) {
            return null;
        }
    }

    scheduleTtl(key: string, ttl: number) {
        const that = this;
        setTimeout(async () => {
            const data = JSON.parse(await read(that.filename, 'utf8'));
            delete data[key];
            await write(that.filename, JSON.stringify(data), 'utf8');
        }, ttl);
    }

}

function accessCache<T>(filename: string, config: Partial<CacheConfig> = {}) {
    return new Cache<T>(filename, config);
}

export { accessCache };
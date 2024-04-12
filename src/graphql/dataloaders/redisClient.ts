import Redis from 'ioredis';

const DATALOADER_REDIS_URL = process.env.DATALOADER_REDIS_URL ?? '';
export const useRedisCache = DATALOADER_REDIS_URL !== '';

const redisClient = new Redis(DATALOADER_REDIS_URL, { lazyConnect: true });

export default redisClient;

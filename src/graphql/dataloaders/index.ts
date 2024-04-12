import DataLoader from 'dataloader';
import RedisDataLoaderFactory from 'redis-dataloader';

import redisClient, { useRedisCache } from './redisClient';

const REDIS_KEYS_TTL = 60 * 60; // 1 hour
const BATCH_SCHEDULE_TIMEOUT = 100;

// loader keys
type readonlyKeys = readonly string[];

const RedisDataLoader = RedisDataLoaderFactory({ redis: redisClient });

// for demo
const getTest = (key: string) => {
  return {
    foo: key
  };
};

const _testLoader = new DataLoader(
  async (keys: readonlyKeys) => keys.map((key) => getTest(key)),
  {
    cache: !useRedisCache,
    // collect all requests over a window of time,
    // which to avoid making a bunch of requests at once
    batchScheduleFn: (cb) => setTimeout(cb, BATCH_SCHEDULE_TIMEOUT),
  }
);
export const testLoader = useRedisCache
  ? new RedisDataLoader('test', _testLoader, { cache: false, expire: REDIS_KEYS_TTL })
  : _testLoader;

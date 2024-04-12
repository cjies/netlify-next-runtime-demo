declare module 'redis-dataloader' {
  import DataLoader from 'dataloader';

  interface Options {
    /**
     * Caching here is a local in memory cache. Caching is always done to redis.
     */
    cache?: boolean;
    /**
     * If set redis keys will be set to expire after this many seconds,
     * this may be useful as a fallback for a redis cache.
     */
    expire?: number; // seconds
    /**
     * Can include a custom serialization and deserialization for storage in redis.
     */
    serialize?: () => unknown;
    deserialize?: () => unknown;
    /**
     * Set this to true to return Buffer objects to the deserialize function
     * when using the ioredis driver.
     */
    buffer?: boolean;
  }

  class RedisDataLoader<K, V> {
    constructor(keySpace: string, dataloader: DataLoader<K, V>, opt?: Options);

    load(key: K): Promise<V>;

    loadMany(keys: ArrayLike<K>): Promise<Array<V | Error>>;

    prime(key: K, value: V | Error): Promise<void>;

    clear(key: K): Promise<this>;

    clearAllLocal(): Promise<this>;

    clearLocal(key: K): Promise<this>;
  }

  function factory<R>(opt: { redis: R }): typeof RedisDataLoader;

  namespace factory {} // callable export workaround https://stackoverflow.com/a/34733202/4425335
  export = factory;
}

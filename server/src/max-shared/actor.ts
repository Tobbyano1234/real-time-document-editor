import nodeCache from "node-cache";

const cache = new nodeCache();


export class CacheService {
  static async set(key: nodeCache.Key, value: any, ttl = null) {
    if (ttl) {
      return cache.set(key, value, ttl);
    }

    return cache.set(key, value);
  };

  static async get(key: nodeCache.Key) {
    return cache.get(key);
  }

  static async del(key: nodeCache.Key | nodeCache.Key[]) {
    return cache.del(key);
  }
};
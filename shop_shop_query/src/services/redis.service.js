const redis = require("redis");
const { promisify } = require("util");
const redisClient = redis.createClient();

const pexpire = promisify(redisClient.pexpire).bind(redisClient);
const setnxAsync = promisify(redisClient.setnx).bind(redisClient);

const acquireLock = async (productId, quantity, cartId) => {
  const key = `lock_v2023_${productId}`;
  const retryTimes = 10;
  const expireTime = 3000;
  for (let index = 0; index < retryTimes; index++) {
    const result = await setnxAsync(key, expireTime);
    if (result === 1) {
      //đặt hàng
      const isReservation = true;
      if (isReservation) {
        await pexpire(key, expireTime);
        return key;
      }
      return null;
    } else {
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
  }
  return null;
};

const releaseLock = async (keyLock) => {
  const delAsyncKey = promisify(redisClient.del).bind(redisClient);
  return await delAsyncKey(keyLock);
};
module.exports = {
  acquireLock,
  releaseLock,
};

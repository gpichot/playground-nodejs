import session from "express-session";
import createRedisStoreConnector from "connect-redis";
import redisClient from "./redis";

const RedisStore = createRedisStoreConnector(session);

export default session({
  secret: "secret",
  resave: false,
  saveUninitialized: false,
  name: "sessionid",
  // cookie: { secure: true },
  store: new RedisStore({
    client: redisClient,
  }),
});

import passport from "passport";
import crypto from "crypto";
import { Strategy as LocalStrategy } from "passport-local";

import db from "@/database";
import { hashPassword } from "./service";

passport.use(
  new LocalStrategy(async (username, password, cb) => {
    const user = await db.collection("users").findOne({ username });
    if (!user) {
      return cb(null, false, {
        message: "Incorrect username or password.",
      });
    }

    const [hash, salt] = user.password.split("$") as [string, string];
    const { hash: hashedPassword } = await hashPassword(password, salt);
    if (
      !crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(hashedPassword))
    ) {
      return cb(null, false, {
        message: "Incorrect username or password.",
      });
    }
    return cb(null, user);
  })
);

passport.serializeUser((user, done) => {
  const username = (user as unknown as { username: string }).username;
  done(null, username);
});

passport.deserializeUser((username, done) => {
  db.collection("users")
    .findOne({ username })
    .then((user) => {
      done(null, user);
    })
    .catch(done);
});

export default passport;

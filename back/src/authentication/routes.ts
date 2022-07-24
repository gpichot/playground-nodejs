import express from "express";
import { validateRequestBody } from "zod-express-middleware";

import { createUser, SignUpSchema } from "./service";
import passport from "./index";

const router = express.Router();

const validateBody: typeof validateRequestBody = (schema) => {
  return (req, res, next) => {
    const validation = schema.safeParse(req.body);

    if (validation.success) {
      req.body = validation.data;
      return next();
    }

    const error = validation.error;

    return res.status(400).json({ errors: error.issues });
  };
};

router.post("/sign-up", validateBody(SignUpSchema), async (req, res) => {
  await createUser(req.body);

  res.status(201).json({ ok: true });
});

router.post("/sign-in", passport.authenticate("local", {}), (req, res) => {
  res.status(200).json({ ok: true });
});

router.delete("/sign-out", (req, res) => {
  req.logout(console.log);
  res.status(200).json({ ok: true });
});

router.get("/profile", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ ok: false });
  }

  res.status(200).json({
    username: (req.session as any)?.passport?.user,
  });
});
export default router;

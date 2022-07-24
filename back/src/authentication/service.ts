import * as z from "zod";
import db from "@/database";
import crypto from "crypto";

export const SignUpSchema = z.object({
  username: z.string().min(4),
  password: z.string().min(4),
});

export type UserDetails = z.infer<typeof SignUpSchema>;

export async function hashPassword(password: string, salt?: string) {
  const passwordSalt = salt ?? crypto.randomBytes(16).toString("hex");

  const hash = await new Promise<string>((resolve, reject) => {
    crypto.pbkdf2(password, passwordSalt, 30000, 64, "sha512", (err, hash) => {
      if (err) reject(err);
      resolve(hash.toString("hex"));
    });
  });
  return { salt: passwordSalt, hash };
}

export async function createUser(user: UserDetails) {
  const existingUser = await db
    .collection("users")
    .findOne({ username: user.username });

  if (existingUser) throw new Error("User with this username already exists");

  const { salt, hash } = await hashPassword(user.password);

  const userToInsert = {
    username: user.username,
    password: `${hash}$${salt}`,
  };

  await db.collection("users").insertOne(userToInsert);
}

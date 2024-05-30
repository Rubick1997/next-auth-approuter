import db from "./db";

export const createUser = async (email: string, password: string) => {
  const results = db
    .prepare("INSERT into users (email, password) VALUES (?, ?)")
    .run(email, password);

  return results.lastInsertRowid;
};

export const getUserByEmail = (email: string) => {
  const foundUser = db
    .prepare("SELECT * FROM users WHERE email = ?")
    .get(email);

  return foundUser as { password: string; id: number | BigInt } | null;
};

import { default as bcrypt } from "bcrypt";
import dotenv from "dotenv";

// if this line is not exist, environment is not apply.
dotenv.config();
const saltRounds = Number(process.env.HASH_SALT);

export async function hashpass(password) {
  let salt = await bcrypt.genSalt(saltRounds);
  let hashed = await bcrypt.hash(password, salt);
  return hashed;
}

export async function compare(plain, hashed) {
  return await bcrypt.compare(plain, hashed);
}

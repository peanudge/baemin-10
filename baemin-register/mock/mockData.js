import { AccountStore } from "../app.js";
import { hashpass } from "../models/util/security.js";

export async function createMockAccounts() {
  console.log("[Mock] Generating Mock Data...");
  const account = await AccountStore.retrieve("test@woowahan.com");
  if (!account) {
    await AccountStore.create(
      "test@woowahan.com",
      await hashpass("123"),
      "01088888888",
      "woowahan",
      new Date().toDateString()
    );
  }
}

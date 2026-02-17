import cron from "node-cron";
import Salary from "../models/Salary.model";

/* Runs at 12:01 AM on 1st day of every month */
cron.schedule("1 0 1 * *", async () => {
  console.log("🔁 Resetting salary credit flags...");

  await Salary.updateMany(
    {},
    {
      $set: { isCredited: false },
      $unset: { creditedAt: "" },
    }
  );

  console.log("✅ Salary credit reset completed");
});

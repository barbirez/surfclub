import { PrismaClient } from "@prisma/client";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { config as loadEnv } from "dotenv";

// Load DATABASE_URL from the first env file we find, walking up from cwd.
for (const dir of [process.cwd(), resolve(process.cwd(), ".."), resolve(process.cwd(), "../.."), resolve(process.cwd(), "../../.."), resolve(process.cwd(), "../../../..")]) {
  for (const name of [".env.local", ".env"]) {
    const p = resolve(dir, name);
    if (existsSync(p)) {
      loadEnv({ path: p });
    }
  }
}

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL not set. Place .env.local with DATABASE_URL in the repo root.");
  process.exit(1);
}

const db = new PrismaClient();

async function main() {
  const liability = await db.liabilityAcceptance.deleteMany({});
  const reservations = await db.reservation.deleteMany({});
  const availability = await db.availability.deleteMany({});

  console.log(
    `Cleared: ${reservations.count} reservations, ${liability.count} liability acceptances, ${availability.count} availability rows.`
  );
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => db.$disconnect());

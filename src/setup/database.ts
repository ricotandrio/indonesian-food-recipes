import { PrismaClient } from "@prisma/client";
import { Logging } from "../libs/Logging";

export const prisma = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query"
    },
    {
      emit: "event",
      level: "error"
    },
    {
      emit: "event",
      level: "info"
    },
    {
      emit: "event",
      level: "warn"
    }
  ],
  errorFormat: 'pretty',
});

// @ts-ignore
prisma.$on("error", (e) => {
  Logging.error(e.message);
})

// @ts-ignore
prisma.$on("warn", (e) => {
  Logging.warn(e.message);
})

// @ts-ignore
prisma.$on("info", (e) => {
  Logging.info(e.message);
})
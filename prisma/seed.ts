import { PrismaClient } from "@prisma/client";

const seed = async () => {
  console.log("Seeding database...");
  const prisma = new PrismaClient();

  const user = await prisma.global.upsert({
    where: { id: "global" },
    update: {},
    create: {
      game: {
        create: {},
      },
    },
  });

  await prisma.$disconnect();
};

seed();

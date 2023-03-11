// prisma/seed.ts


import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Delete all `User` and `Message` records
  await prisma.owner.deleteMany({});
  await prisma.cat.deleteMany({});
  // (Re-)Create dummy `User` and `Message` records
  await prisma.cat.create({
    data: {
      name: "Jack",
      birthDate: "12-12-20",
      breed: "Siamese cat",
      imageUrl: "",
      owner: {
        create: {
          name: "Summer",
          imageUrl: "",
        },
      },
    },
  });
}

main()
  .then(() => {
    console.log("Data seeded...");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

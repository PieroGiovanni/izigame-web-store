import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  const iziGameBrand = await prisma.brand.upsert({
    where: {
      id: 1,
    },
    create: {
      name: 'Izi Game',
    },
    update: {},
  });

  const ropa = await prisma.category.upsert({
    where: {
      id: 1,
    },
    create: {
      name: 'Ropa',
    },
    update: {},
  });

  console.log({
    message: 'Database was seeded with the following data:',
    iziGameBrand,
    ropa,
  });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

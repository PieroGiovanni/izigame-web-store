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

  const blackColor = await prisma.color.upsert({
    where: {
      id: 1,
    },
    create: {
      hexColor: '#000000',
      name: 'Negro',
    },
    update: {},
  });

  const whiteColor = await prisma.color.upsert({
    where: {
      id: 2,
    },
    create: {
      hexColor: '#ffffff',
      name: 'Blanco',
    },
    update: {},
  });

  const standardSize = await prisma.size.upsert({
    where: { id: 1 },
    create: {
      name: 'Estándar',
      abbreviation: 'Estándar',
      categoryId: 1,
    },
    update: {},
  });

  const smallSize = await prisma.size.upsert({
    where: { id: 2 },
    create: {
      name: 'Small',
      abbreviation: 'S',
      categoryId: 1,
    },
    update: {},
  });

  const mediumSize = await prisma.size.upsert({
    where: { id: 3 },
    create: {
      name: 'Medium',
      abbreviation: 'L',
      categoryId: 1,
    },
    update: {},
  });

  const largeSize = await prisma.size.upsert({
    where: { id: 4 },
    create: {
      name: 'Large',
      abbreviation: 'L',
      categoryId: 1,
    },
    update: {},
  });

  const extraLargeSize = await prisma.size.upsert({
    where: { id: 1 },
    create: {
      name: 'Extra Large',
      abbreviation: 'XL',
      categoryId: 1,
    },
    update: {},
  });

  console.log({
    message: 'Database was seeded with the following data:',
    iziGameBrand,
    ropa,
    blackColor,
    whiteColor,
    standardSize,
    smallSize,
    mediumSize,
    largeSize,
    extraLargeSize,
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

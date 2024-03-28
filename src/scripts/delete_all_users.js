const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function deletePhoneNumber() {
  try {
    await prisma.user.updateMany({}, { $unset: { phone: '' } });
    console.log('Deleted phone number for all users');
  } catch (error) {
    console.error('Error deleting phone number:', error);
  } finally {
    await prisma.$disconnect();
  }
}

deletePhoneNumber();

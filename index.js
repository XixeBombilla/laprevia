import { PrismaClient }from '@prisma/client'

const prisma = new PrismaClient()

const tareas = async () => {
  const tareas = await prisma.tarea.findMany()

  return tareas
}

const crear = async ({ titulo }) => {
  await prisma.tarea.create({
    data: {
      titulo
    }
  })
}

tareas().then(async () => await prisma.$disconnect()).catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
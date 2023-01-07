import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const tareas = async () => {
  // Completar aca!
  const tareas = await prisma.tarea.findMany()

  return tareas
}

const crear = async texto => {
  // Completar aca!
  const tarea = await prisma.tarea.create({
    data: {
      texto,
      completa: false
    }
  })

  return tarea
}

const editar = async (id, completa) => {
  // Completar aca!
  const tarea = await prisma.tarea.update({
    where: {
      id
    },
    data: {
      completa
    }
  })

  return tarea
}

const borrar = async id => {
  // Completar aca!
  await prisma.tarea.delete({
    where: {
      id
    }
  })

  return id
}

// funciones para prisma
const todasTareas = () => tareas().catch((e) => { throw e }).finally(async () => { await prisma.$disconnect() })
const crearTarea = texto => crear(texto).catch((e) => { throw e }).finally(async () => { await prisma.$disconnect() })
const editarTarea = (id, completa) => editar(id, completa).catch((e) => { throw e }).finally(async () => { await prisma.$disconnect() })
const borrarTarea = id => borrar(id).catch((e) => { throw e }).finally(async () => { await prisma.$disconnect() })

export {
  todasTareas,
  crearTarea,
  editarTarea,
  borrarTarea
}
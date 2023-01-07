import { createSchema } from 'graphql-yoga'
import { todasTareas, crearTarea, editarTarea, borrarTarea } from '../prisma/tareas'

export const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type Query {
      tareas: [Tarea]
    }
    type Mutation {
      crearTarea(texto: String): Tarea
      editarTarea(id: Int, completa: Boolean): Tarea
      borrarTarea(id: Int): Int
    }
    type Tarea {
      id: ID!
      texto: String
      completa: Boolean
    }
  `,
  resolvers: {
    Query: {
      tareas: (_, { id }) => todasTareas(id)
    },
    Mutation: {
      crearTarea: (_, { texto }) => crearTarea(texto),
      editarTarea: (_, { id, completa }) => editarTarea(id, completa),
      borrarTarea: (_, { id }) => borrarTarea(id),
    }
  }
})
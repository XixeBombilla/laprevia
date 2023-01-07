import { List } from "@chakra-ui/react";
import React from "react";
import Tarea from "./Tarea";

const Lista = ({ tareas, assignarTareas }) => (
  <List spacing={3}>
    {tareas.map((tarea, i) => <Tarea key={`tarea-${i}`} tarea={tarea} assignarTareas={assignarTareas} />)}
  </List>
)

export default Lista
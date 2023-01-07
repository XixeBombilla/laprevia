import { Input, Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'

const CREAR_TAREA = gql`
  mutation CrearTareaMutation($texto: String) {
    crearTarea(texto: $texto) {
      id
      texto
      completa
    }
  }
`;

const CrearTarea = ({ assignarTareas }) => {
  const [crearTareaMutation, _] = useMutation(CREAR_TAREA);
  const [texto, assignartexto] = useState('')

  const crearTarea = async () => {
    const { data: { crearTarea: nuevaTarea } } = await crearTareaMutation({ variables: { texto } })
    assignartexto('')
    assignarTareas(prev => ([ ...prev, nuevaTarea ]))
  }

  const onChange = ({ currentTarget: { value } }) => assignartexto(value)

  return (
    <>
      <Input
          mt={5}
          value={texto}
          variant="outline"
          type="text"
          placeholder="Agregar tarea"
          onChange={onChange}
      />
      <Button
        colorScheme='blue'
        style={{ width: '100%', marginTop: '10px' }}
        onClick={crearTarea}
        isDisabled={!texto}
      >
        Crear Tarea
      </Button>
    </>
  )
}

export default CrearTarea
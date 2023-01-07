import { useMutation, gql } from "@apollo/client";
import { ListItem, Checkbox, Divider, Text, IconButton, Flex, Box } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { DeleteIcon } from '@chakra-ui/icons'

const EDITAR_TAREA = gql`
  mutation EditarTareaMutation($id: Int, $completa: Boolean) {
    editarTarea(id: $id, completa: $completa) {
      id
      texto
      completa
    }
  }
`;

const BORRAR_TAREA = gql`
  mutation BorrarTareaMutation($id: Int) {
    borrarTarea(id: $id)
  }
`;

const Tarea = ({ tarea: { id, texto, completa = false }, assignarTareas }) => {
  const [editarTareaMutation, _editar] = useMutation(EDITAR_TAREA);
  const [borrarTareaMutation, _borrar] = useMutation(BORRAR_TAREA);
  const [esCompleta, assignarCompleta] = useState(completa)

  useEffect(() => {
    assignarCompleta(completa)
  }, [completa])

  const onChange = async ({ currentTarget: { checked: completa } }) => {
    await editarTareaMutation({ variables: { id: Number(id), completa } })
    assignarCompleta(completa)
  }

  const onClick = () => {
    borrarTareaMutation({ variables: { id: Number(id) } })
    assignarTareas(prev => {
      const tareasActivas = []
      prev.forEach(tarea => {
        const { id: idTarea } = tarea
        if (idTarea !== id) tareasActivas.push(tarea)
      })

      return tareasActivas
    })
  }

  return (
    <>
      <ListItem>
        <Flex justify="space-between">
          <Box>
            <Checkbox size='lg'
              isChecked={esCompleta}
              onChange={onChange}
            >
              <Text as={esCompleta ? 'del' : ''}>{texto}</Text>
            </Checkbox>
          </Box>
          <IconButton
            aria-label='Borrar Tarea'
            icon={<DeleteIcon />}
            onClick={onClick}
          />
        </Flex>
      </ListItem>
      <Divider />
    </>
  )
}

export default Tarea
import { gql, useQuery } from '@apollo/client';
import {
  ChakraProvider,
  Box,
  Heading,
  theme,
} from '@chakra-ui/react';
import React, { useState } from 'react'
import CrearTarea from "./components/CrearTarea";
import Lista from "./components/Lista";

const TODAS_TAREAS = gql`
  query TodasTareas {
    tareas {
      id
      texto
      completa
    }
  }
`;

const MainWrapper = () => {
  const { loading, error, data } = useQuery(TODAS_TAREAS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const { tareas } = data

  return <App tareas={tareas} />
}

const App = ({ tareas }) => {
  const [todasTareas, assignarTareas] = useState(tareas);

  return (
    <ChakraProvider theme={theme}>
      <Box py={10} px={6}>
        <Heading as="h1" size="xl" mb={5}>Tareas</Heading>
        <Lista tareas={todasTareas} assignarTareas={assignarTareas}/>
        <CrearTarea assignarTareas={assignarTareas}/>
      </Box>
    </ChakraProvider>
  );
}

export default MainWrapper;

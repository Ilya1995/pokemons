import React from 'react';
import 'typeface-roboto';
import PokemonPanels from './components/PokemonPanels';
import { Container } from '@material-ui/core';

const App = () => {
  return (
    <Container maxWidth="md">
      <PokemonPanels />
    </Container>
  );
};

export default App;

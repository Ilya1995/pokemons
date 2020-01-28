import React, { useEffect, useState } from 'react';
import store from '../store';
import Filter from './Filter';
import Pagination from './Pagination';
import PanelDetails from './PanelDetails';
import PanelSummary from './PanelSummary';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import CircularProgress from '@material-ui/core/CircularProgress';

import { observer } from 'mobx-react';
const PokemonPanels = () => {
  useEffect(() => {
    store.getPokemos({ pagination: { offset: 0, limit: 10 } });
  }, []);
  const [expanded, setExpanded] = useState(null);
  const handleChange = id => {
    if (expanded === id) {
      setExpanded(null);
    } else {
      store.getSpeciesPokemon(id);
      setExpanded(id);
    }
  };

  const panels = store.pokemonsData.pokemons.map(pokemon => {
    return (
      <ExpansionPanel
        key={pokemon.id}
        expanded={expanded === pokemon.id}
        onChange={() => handleChange(pokemon.id)}
      >
        <PanelSummary pokemon={pokemon} />
        <PanelDetails pokemon={pokemon} speciesPokemon={store.speciesPokemon} />
      </ExpansionPanel>
    );
  });

  return (
    <div>
      <h1 className="text-center">Pokemon repository</h1>
      <Filter getPokemos={store.getPokemos} />
      {store.loading ? (
        <CircularProgress className="circular-progress" disableShrink />
      ) : (
        panels
      )}

      <Pagination
        count={store.pokemonsData.totalCount}
        getPokemos={store.getPokemos}
      />
    </div>
  );
};

export default observer(PokemonPanels);

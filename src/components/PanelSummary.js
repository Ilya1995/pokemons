import React, { useState } from 'react';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import TableHead from '@material-ui/core/TableHead';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import { Button, Grid } from '@material-ui/core';

import Modal from './Modal';
import store from '../store';
import { observer } from 'mobx-react';

const PanelSummary = ({ pokemon }) => {
  const [openModal, setOpen] = useState(false);

  const handleAbility = (url, event) => {
    event.stopPropagation();
    setOpen(true);
    store.getAbility(url);
  };

  const handleCloseModal = event => {
    event.stopPropagation();
    setOpen(false);
    store.setAbility(null);
  };

  const abilities = pokemon.abilities.map(abilitie => {
    return (
      <Button
        key={abilitie.ability.name}
        onClick={handleAbility.bind(this, abilitie.ability.url)}
      >
        {abilitie.ability.name}
      </Button>
    );
  });

  return (
    <ExpansionPanelSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1bh-content"
      id="panel1bh-header"
    >
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
      >
        <img
          src={pokemon.sprites.front_default}
          className="image-pokemon"
          alt="pokemon"
        />
        <Typography variant="h5" gutterBottom>
          {pokemon.name}
        </Typography>
        <Typography className="typography-abilities">{abilities}</Typography>
        <TableContainer className="table-container">
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Number</TableCell>
                <TableCell align="right">Height</TableCell>
                <TableCell align="right">Weight</TableCell>
                <TableCell align="right">Base experience</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  {pokemon.id}
                </TableCell>
                <TableCell align="right">{pokemon.height / 10} m</TableCell>
                <TableCell align="right">{pokemon.weight / 10} kg</TableCell>
                <TableCell align="right">{pokemon.base_experience}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      {openModal ? (
        <Modal
          title="The ability the Pokémon may have."
          text={store.ability}
          handleClose={handleCloseModal}
        />
      ) : (
        ''
      )}
    </ExpansionPanelSummary>
  );
};

export default observer(PanelSummary);

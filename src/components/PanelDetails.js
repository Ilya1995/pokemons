import React from 'react';
import PropTypes from 'prop-types';
import LinearIndeterminate from './LinearIndeterminate';

import Typography from '@material-ui/core/Typography';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Grid } from '@material-ui/core';

const PanelDetails = ({ pokemon, speciesPokemon }) => {
  return (
    <>
      <ExpansionPanelDetails>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="flex-start"
        >
          <TableContainer className="table-stats">
            <Table aria-label="simple table">
              <TableBody>
                {pokemon.stats.map(stat => (
                  <TableRow key={stat.stat.name}>
                    <TableCell component="th" scope="row">
                      {stat.stat.name}
                    </TableCell>
                    <TableCell align="right">{stat.base_stat}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div>
            <Typography>Types pokemon:</Typography>
            <List component="nav" aria-label="mailbox folders">
              {pokemon.types.map(type => (
                <ListItem button key={type.type.name} divider>
                  <ListItemText primary={type.type.name} />
                </ListItem>
              ))}
            </List>
          </div>
        </Grid>
      </ExpansionPanelDetails>
      <ExpansionPanelDetails>
        {speciesPokemon ? (
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
          >
            <Typography>Evolution Chain</Typography>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableBody>
                  <TableRow>
                    {speciesPokemon.evolutionChain.map(chain => {
                      return (
                        <React.Fragment key={chain.name}>
                          <TableCell align="right">
                            <img
                              src={chain.img}
                              className="image-pokemon"
                              alt="pokemon"
                            />
                          </TableCell>
                          <TableCell align="right">{chain.name}</TableCell>
                        </React.Fragment>
                      );
                    })}
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        ) : (
          <LinearIndeterminate />
        )}
      </ExpansionPanelDetails>
    </>
  );
};

PanelDetails.propTypes = {
  pokemon: PropTypes.object.isRequired,
  speciesPokemon: PropTypes.object,
};

export default PanelDetails;

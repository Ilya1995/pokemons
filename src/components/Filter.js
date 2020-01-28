import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';

const Filter = ({ getPokemos }) => {
  const [name, setName] = useState(null);
  const [type, setType] = useState([]);

  const types = [
    'normal',
    'fighting',
    'flying',
    'poison',
    'ground',
    'rock',
    'bug',
    'ghost',
    'steel',
    'fire',
    'water',
    'grass',
    'electric',
    'psychic',
    'ice',
    'dragon',
    'dark',
    'fairy',
  ];

  const handleChangeInput = event => {
    setName(event.currentTarget.value);
  };

  const handleChangeSelect = event => {
    setType(event.target.value);
  };

  return (
    <Grid
      container
      direction="row"
      justify="flex-end"
      alignItems="flex-end"
      className="filter-container"
    >
      <TextField
        id="standard-basic"
        label="name"
        onChange={handleChangeInput}
      />

      <FormControl className="form-control">
        <InputLabel id="demo-mutiple-name-label">Types</InputLabel>
        <Select
          labelId="demo-mutiple-name-label"
          id="demo-mutiple-name"
          multiple
          value={type}
          onChange={handleChangeSelect}
          input={<Input />}
        >
          {types.map(name => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        variant="contained"
        disabled={!name && !type.length}
        onClick={() => getPokemos({ filter: { name, type } })}
      >
        Search
      </Button>
    </Grid>
  );
};

Filter.propTypes = {
  getPokemos: PropTypes.func.isRequired,
};

export default Filter;

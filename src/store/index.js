import { decorate, observable, action } from 'mobx';
import _ from 'lodash';
import 'whatwg-fetch';

class Store {
  pokemonsData = { pokemons: [], totalCount: 0 };
  speciesPokemon = null;
  ability = null;
  loading = false;
  filter = { name: '', type: [] };

  setLoading = payload => {
    this.loading = payload;
  };

  setAbility = payload => {
    this.ability = payload;
  };

  searchNames = pokemonNames => {
    let resNames = [];
    pokemonNames.forEach(pokemon => {
      if (pokemon.name.includes(this.filter.name)) {
        resNames.push(pokemon);
      }
    });
    return resNames;
  };

  async getAbility(url) {
    try {
      let response = await fetch(url, {
        method: 'get',
        headers: {
          'Content-type': 'application/json',
        },
      });
      let json = await response.json();
      this.setAbility(json.effect_entries[0].effect);
    } catch (err) {
      console.log(err);
    }
  }

  getPokemos = data => {
    this.setLoading(true);
    if (this.filter.name || this.filter.type.length || data.filter) {
      if (data.filter) {
        this.filter = data.filter;
      }

      if (this.filter.type.length) {
        this.filterType(data);
      } else {
        this.filterName(data);
      }
    } else {
      this.searchPokemon(data);
    }
  };

  searchPokemon = data => {
    fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${data.pagination.offset}&limit=${data.pagination.limit}`,
      {
        method: 'get',
        headers: {
          'Content-type': 'application/json',
        },
      }
    )
      .then(response => response.json())
      .then(json => {
        let totalCount = json.count;
        let requests = json.results.map(result => fetch(result.url));
        this.detailedInformation(requests, totalCount);
      })
      .catch(err => {
        console.log(err);
        this.setLoading(false);
      });
  };

  filterType = data => {
    let requests = this.filter.type.map(result =>
      fetch(`https://pokeapi.co/api/v2/type/${result}`)
    );
    Promise.all(requests)
      .then(responses => Promise.all(responses.map(r => r.json())))
      .then(types => {
        let pokemons = [];
        types.forEach(type =>
          type.pokemon.forEach(element => pokemons.push(element.pokemon))
        );
        var used = {};
        var filtered = pokemons.filter(obj =>
          obj.name in used ? 0 : (used[obj.name] = 1)
        );
        this.pagination(filtered, data.pagination);
      })
      .catch(err => {
        console.log(err);
        this.setLoading(false);
      });
  };

  filterName = data => {
    fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=1000', {
      method: 'get',
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(json => {
        this.pagination(json.results, data.pagination);
      })
      .catch(err => {
        console.log(err);
        this.setLoading(false);
      });
  };

  pagination = (data, pagination) => {
    if (this.filter.name) {
      data = this.searchNames(data);
    }
    let totalCount = data.length;
    if (!pagination) {
      pagination = { offset: 0, limit: 10 };
    }

    let requests = data
      .slice(pagination.offset, pagination.offset + pagination.limit)
      .map(pokemon => fetch(pokemon.url));
    this.detailedInformation(requests, totalCount);
  };

  detailedInformation = (requests, totalCount) => {
    Promise.all(requests)
      .then(responses => Promise.all(responses.map(r => r.json())))
      .then(pokemons => {
        this.pokemonsData = { pokemons, totalCount };
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => this.setLoading(false));
  };

  getSpeciesPokemon = id => {
    if (this.speciesPokemon && this.speciesPokemon.id !== id) {
      this.speciesPokemon = null;
    }
    let species;
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`, {
      method: 'get',
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(json => {
        species = json;
        return fetch(json.evolution_chain.url);
      })
      .then(response => response.json())
      .then(json => {
        let evolution = _.compact(
          _.at(json, [
            'chain.species.name',
            'chain.evolves_to[0].species.name',
            'chain.evolves_to[0].evolves_to[0].species.name',
            'chain.evolves_to[1].species.name',
          ])
        );
        let requests = evolution.map(name =>
          fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        );
        Promise.all(requests)
          .then(responses => Promise.all(responses.map(r => r.json())))
          .then(pokemons => {
            species.evolutionChain = pokemons.map(pokemon => {
              return {
                name: pokemon.name,
                img: pokemon.sprites.front_default,
              };
            });
            this.speciesPokemon = species;
          });
      })
      .catch(err => {
        console.log(err);
      });
  };
}

Store = decorate(Store, {
  pokemonsData: observable,
  speciesPokemon: observable,
  ability: observable,
  loading: observable,
  getSpeciesPokemon: action,
  setAbility: action,
  getPokemos: action,
  detailedInformation: action,
  setLoading: action,
});

export default new Store();

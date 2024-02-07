import axios from "axios";
import React from "react";
import { Grid, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';
import PokemonImage from "./pokemonImageCard";
import styled from "styled-components";


const Container = styled.div`
  flex: 1;
  height: 70vh;
  position: relative;
`;

const Pokemon = () => {
    const [pokemon, setPokemon] = React.useState([]);
    const [version, setVersion] = React.useState('Kanto');
    const [versions] = React.useState({
        'All': { limit: 1118, offset: 0 }, 'Kanto': { limit: 151, offset: 0 }, 'Jyoto': { limit: 100, offset: 151 },
         'Hoenn': { limit: 135, offset: 251 }, 'Sinnoh': { limit: 107, offset: 386 }, 'Unova': { limit: 156, offset: 493 },
        
    });

    const getAllPokemon = async () => {
        try {
            const { limit, offset } = versions[version];
            const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
            setPokemon(res.data.results);
        }
        catch (err) {
            console.log(err);
        }
    }

    const handleChange = (event) => {
        const { value } = event.target;
        setVersion(value);
    }

    React.useEffect(() => {
        setPokemon([]);
        getAllPokemon();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [version]);

    return (
        <Container style={{ marginTop: '15px' }}>
            {version === 'All' 
            ? <Typography variant='h5'> Showing Pokemon of {version} versions </Typography>
            : <Typography variant='h5'> Showing Pokemon of the {version} version  </Typography>
            }
            <FormControl variant='standard' style={{float:'right', width:'15vh'}}>
                <InputLabel > Generation </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Age"
                    value={version}
                    onChange={handleChange}
                >
                    {Object.keys(versions).map((gen, id) => {
                        return (
                            <MenuItem key={id} value={gen}>{gen}</MenuItem>
                        )
                    })}

                </Select>
            </FormControl>
            <Grid container spacing={2} justify='center' alignItems='center'>
                {pokemon.map((poke, idx) => {
                    return (
                        <Grid item key={idx} xs={12} md={2}>
                            <PokemonImage key={idx} pokemon={poke} />
                        </Grid>
                    )
                })}
            </Grid>
        </Container>
    )
}

export default Pokemon;
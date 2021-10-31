import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import getIndividualPokemon from '../apis/getIndividualPokemon';
const PokemonImage = (poke) => {
    const [pokemonImageData, setPokemonImageData] = React.useState({});
    const [pokemonType, setPokemonType] = React.useState([]);
    const [id, setId] = React.useState();
   
    const getPokemon = async () => {
        const res = await getIndividualPokemon(poke);
        setId(res.id);
        setPokemonImageData(res['sprites']['other']['official-artwork']['front_default']);
        setPokemonType(res.types)
    }
    
    React.useEffect( () => {
        getPokemon();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return (
        <Card >
            <CardMedia component='img' src={pokemonImageData} alt={poke.pokemon.name} />
            <CardContent>
                <Typography variant='h6'> <b> {(poke.pokemon.name).toUpperCase()} </b> </Typography>
                <Typography variant='h6'> #{(id)}</Typography>
                {pokemonType.map((type, id) => {
                    return (
                        <span key={id} > {type.type.name} </span>
                    )
                })}
            </CardContent>
        </Card>
    )
}

export default PokemonImage;
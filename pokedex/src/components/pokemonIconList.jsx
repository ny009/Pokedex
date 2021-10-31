import React from 'react';
import { ListItem, ListItemText, ListItemIcon } from '@mui/material';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import getIndividualPokemon from '../apis/getIndividualPokemon';
const PokemonIcon = (poke, index) => {
    const [pokemonIconData, setPokemonImageData] = React.useState({});
    const [id, setId] = React.useState();
    const getPokemon = async () => {
        const res = await getIndividualPokemon(poke);
        if (res.sprites) {
            setPokemonImageData(res['sprites']['versions']['generation-viii']['icons']['front_default']);
        }
        setId(res.id);
    }
    React.useEffect(() => {
        getPokemon();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <ListItem button dense align='flex-start'>
            {/* <ListItemText primary={id} /> */}
            <ListItemIcon>
                {pokemonIconData ?
                    <img src={pokemonIconData} alt={poke.pokemon.name} />
                    : <ImageNotSupportedIcon />
                }
            </ListItemIcon>
            <ListItemText primary={poke.pokemon.name} />

        </ListItem>
    )
}

export default PokemonIcon;
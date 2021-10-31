import axios from 'axios';

const getIndividualPokemon = async (poke) => {
    try {
        const res = await axios.get(poke.pokemon.url);
        return res.data;
    }
    catch (err) {
        console.log(err);
        return err;
    }
}

export default getIndividualPokemon;
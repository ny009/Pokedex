import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Pokemon from "./Pokemon";
import PokemonIcon from './pokemonIconList';
import axios from 'axios';

const drawerWidth = 250;

export default function SideBar(props) {
    const [pokemon, setPokemon] = React.useState([{ id: { name: '', url: '' } }]);
    const getAllPokemon = async () => {
        try {
            const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1118');
            setPokemon(res.data.results);
        }
        catch (err) {
            console.log(err);
        }
    }
    React.useEffect(() => {
        getAllPokemon();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        POKEDEX
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
                component="nav"
            >
                <Toolbar />
                <Divider />
                <List>
                    <ListItem key='pokemonList'>
                        <ListItemText primary="Navigate to a pokemon" />
                    </ListItem>
                    <Divider />
                    {pokemon.map((poke, index) => (
                        <>
                            {
                                poke.name &&
                                <div>
                                    <PokemonIcon pokemon={poke} />
                                    <Divider />
                                </div>
                            }
                        </>
                    ))}
                </List>
            </Drawer>
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
            >
                <Toolbar />
                <Pokemon />
            </Box>
        </Box>
    );
}

import React, {useState,useEffect} from 'react'
import {Container, Grow, Grid,Paper,AppBar,TextField,Button} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import useStyles from './styles';
import {getPosts , getPostsBySearch} from '../../actions/posts';
import Pagination from '../Pagination';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}


const Home = () => {

    const [currentId, setCurrentId] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const query = useQuery();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);


    useEffect(() => {
        dispatch(getPosts());
    },[currentId,dispatch]);

    const searchPost = () => {
        if(search.trim() || tags){
            dispatch(getPostsBySearch({search,tags : tags.join(',')}));
            history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
        }else{
            history.push('/');
        }
    };

    const handleKeyPress = (e) => {
        if(e.keyCode === 13){
            searchPost();
        }
    };

    const handleAdd = (tag) => setTags([...tags,tag]);
    const handleDelete = (tagtoDelete) => setTags(tags.filter((tag) => tag!==tagtoDelete));


    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position='static' color='inherit'>
                            <TextField 
                            name='search' 
                            variant='outlined' 
                            label='Search Posts' 
                            onKeyPress={handleKeyPress}
                            fullwidth
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}  />
                            <ChipInput 
                                style={{margin: '10px 0'}}
                                value={tags}
                                onAdd={handleAdd}
                                onDelete={handleDelete}
                                label='Search Tags'
                                variant='outlined'
                            />
                            <Button onClick={searchPost} className={classes.searchButton} variant='contained' color='primary'>Search</Button>
                        </AppBar> 
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        <Paper  elevation={6} >
                            <Pagination />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}




export default Home
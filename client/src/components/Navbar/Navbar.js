import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {AppBar, Avatar, Toolbar, Typography, Button} from '@material-ui/core';
import useStyles from './styles';
import memories from '../../images/memories.jpg';
import {useDispatch} from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import jwt_decode from "jwt-decode";


const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));   // fetching from gauth data
    const history = useHistory();
    const location = useLocation();

    const logout = () => {
        try {
            dispatch({type:'LOGOUT'});
            setUser(null);
            history.pushState('/');
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const token = user?.token;

        // JWT expire
        if(token){
            const decodedToken = jwt_decode(token);
            if(decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    },[location]);

    

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
        <div className={classes.brandContainer}>
                <Typography component={Link} to="/" className={classes.heading} variant="h3" align="center">TravelScape</Typography>
                <img className={classes.image} src={memories} alt="memories" height="70" />
        </div>
        <Toolbar className={classes.toolbar}>   
            {user ? (
                <div className={classes.profile}>
                    <Avatar className={classes.purple} alt = {user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                    <Typography className={classes.userName} variant='h6'>{user.result.name}</Typography>
                    <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                </div>
            ) : (
                <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
            )}
        </Toolbar>
                
    </AppBar>
  );
};

export default Navbar;
import React,{useState, useEffect} from 'react'
import { Avatar,Button,Paper,Grid,Typography,Container, TextField } from '@material-ui/core';
import {GoogleLogin} from 'react-google-login';
import LockOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import {gapi} from 'gapi-script';
import {useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import dotenv from 'dotenv';

import Icon from './icon';
import useStyles from './styles';
import Input from './Input';

dotenv.config();

const Auth = () => {
    
    const classes = useStyles();
    const [showPassword,setShowPassword] = useState(false);
    const [isSignUp, setisSignUp]= useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    
    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId : process.env.REACT_APP_GOOGLE_CLIENT_ID,
                scope:""
            })
        };
        gapi.load('client:auth2', start);
    });

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword );

    const handleSubmit = () => {

    };

    const handleChange = () => {

    };

    const switchMode = () => {
        setisSignUp((prevIsSignUp) => !prevIsSignUp);
        handleShowPassword(false);
    };

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({type:'AUTH', data:{result,token}});
            history.push('/');
        } catch (error) {
            console.log(error);
        }
    };

    const googleFailure = (res) => {
        console.log("Login unsuccessful. Try Again!");
        console.log(res);
    };

  return (
    <Container component="main" maxWidth="xs">
        <Paper  className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography variant='h5'>{isSignUp ? 'Sign Up ': 'Login'}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {
                        isSignUp && (
                            <>
                                <Input name='firstName' label="First Name" handleChange={handleChange} autoFocus half />
                                <Input name='lastName' label="Last Name" handleChange={handleChange}  half />
                                
                            </>
                        )
                    }
                    <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                    <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text": "password"} handleShowPassword={handleShowPassword} />
                    {isSignUp && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                </Grid>

                <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit} >
                    {isSignUp ? 'Sign Up': 'Login'}
                </Button>

                <GoogleLogin
                    clientId = {process.env.REACT_APP_GOOGLE_CLIENT_ID}
                    render={(renderProps) => (
                        <Button 
                            className={classes.googleButton} 
                            color='primary' 
                            fullWidth 
                            onClick={renderProps.onClick} 
                            disabled={renderProps.disabled} 
                            startIcon={<Icon />} 
                            variant='contained'>
                                Google Sign In
                        </Button>
                        
                    )}
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy='single_host_origin'
                />

                <Grid container justify="flex-end" >
                    <Grid item>
                        <Button onClick={switchMode}> 
                            {isSignUp ? 'Already have an account? Login' : 'Do not have an account? SignUp'}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    </Container>
  );
};

export default Auth;
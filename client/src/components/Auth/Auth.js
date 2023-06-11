import React,{useState} from 'react'
import { Avatar,Button,Paper,Grid,Typography,Container, TextField } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOpenOutlined';

import useStyles from './styles';
import Input from './Input';

const Auth = () => {
    
    const classes = useStyles();
    const [showPassword,setShowPassword] = useState(false);
    const [isSignUp, setisSignUp]= useState(false);


    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword );

    const handleSubmit = () => {

    };

    const handleChange = () => {

    };

    const switchMode = () => {
        setisSignUp((prevIsSignUp) => !prevIsSignUp);
        handleShowPassword(false);
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
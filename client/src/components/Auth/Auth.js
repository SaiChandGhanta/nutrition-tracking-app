import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'


import * as api from '../../api/index.js';
import useStyles from "./styles";
import Input from './Input';
import Icon from './icon';
import { signin, signup } from '../../actions/auth.js';


const Auth = () => {

    const classes = useStyles();

    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false)
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' })


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleShowPassword = () => setShowPassword((prev) => !prev);

    // Function to execute on Swich between SignUp and SignIn
    const switchMode = () => {

        setIsSignup((prev) => !prev);
        setShowPassword(false)
    }

    // Function to handle signin/sighup form submit
    const handleSubmit = (e) => {

        // prevent Default Form Submit
        e.preventDefault();

        if (isSignup) {
            dispatch(signup(formData, navigate))
        } else {
            dispatch(signin(formData, navigate))
        }

    };

    // Capture the values in Form and Set In State
    const handleChange = (e) => {

        setFormData({ ...formData, [e.target.name]: e.target.value });

    }

    // This Function will run afetr google authentication is successful
    const googleSuccess = async (res) => {

        const result = res?.profileObj;
        const token = res?.tokenId;

        console.log(result);
        console.log(token);

        try {

            // Dispath the payload to reducers
            dispatch({ type: "AUTH", payload: { result, token } });

            // Store the user details in MongoDB
            await api.gstore(result)

            // Redirect to home page after dispathch
            navigate('/dashboard')

        } catch (error) {
            console.log(error)
        }

    }

    // After LogIn fail -> logging error 
    const googleFailure = (error) => {
        console.log(error);
    }


    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>

                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignup && (
                            <>
                                <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half />
                                <Input name='lastName' label='Last Name' handleChange={handleChange} autoFocus half />

                            </>
                        )}
                        <Input name='email' label='Email Address' handleChange={handleChange} type='email' />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        {isSignup && <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} />}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <GoogleLogin
                        clientId='27236899150-k0po190vahmj2avp05fnujinlibc5ut6.apps.googleusercontent.com'
                        render={
                            (renderProps) => (
                                <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                                    Google Sign In
                                </Button>
                            )
                        }
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                </form>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Button onClick={switchMode}>
                            {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )


}

export default Auth
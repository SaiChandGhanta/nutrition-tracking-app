import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppBar, Avatar, Button, Toolbar, Typography, Box, Paper, Container } from "@material-ui/core";
import useStyles from "./styles";
import lifesum from "../../images/lifesum.png";
import homeimg from '../../images/home.png';
import decode from 'jwt-decode';



const Navbar = () => {

    // MATERIAL UI classes
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    // Setting the User
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

    // Logout Function
    const logout = () => {
        // Dispatch LogOut Action
        dispatch({ type: "LOGOUT" })

        // Navigate User to Home Page
        navigate('/')

        // Set The User to Null
        setUser(null);
    }

    // maintain user profile on location change
    useEffect(() => {

        // JWT token expiration... => LogOut of the app
        const token = user?.token;

        // JWT token expiration... => LogOut of the app
        if (token) {

            const decodeToken = decode(token);

            // If the token expiration timeline is crossed -> LogOut the user
            if (decodeToken.exp * 1000 < new Date().getTime()) logout()

        }

        setUser(JSON.parse(localStorage.getItem('profile')));

    }, [location]);


    return (
        <>
            <AppBar className={classes.appBar} position="static" color="inherit">
                <div className={classes.brandContainer}>
                    <Typography
                        component={Link}
                        to="/"
                        className={classes.heading}
                        variant="h3"
                        align="center"
                    >
                        Lifesum
                    </Typography>
                    <img className={classes.image} src={lifesum} alt="icon" height="60" />

                    {console.log("In the testing zone ====> " + user)}
                    {user && (<>
                        <Button
                            variant="contained"
                            className={classes.diet}
                            color="apple"
                            component={Link}
                            to="/dashboard"
                            size="large"
                        >
                            Home
                        </Button>
                        <Button
                            variant="contained"
                            className={classes.diet1}
                            color="apple"
                            component={Link}
                            to="/diet"
                            size="large"
                        >
                            Diet
                        </Button>
                        <Button
                            variant="contained"
                            className={classes.diet1}
                            color="apple"
                            component={Link}
                            to="/activities"
                            size="large"
                        >
                            Activity
                        </Button>
                    </>
                    )}


                </div>

                <Toolbar className={classes.toolbar}>
                    {user ? (

                        <div className={classes.profile}>

                            <Avatar
                                className={classes.purple}
                                alt={user.result.name}
                                src={user.result.imageUrl}
                                component={Link}
                                to="/profile"
                            >
                                {user.result.name.charAt(0)}
                            </Avatar>
                            <Typography className={classes.userName} variant="h6">
                                {user.result.name}
                            </Typography>

                            <Button
                                variant="contained"
                                className={classes.logout}
                                color="secondary"
                                onClick={logout}
                            >
                                Logout
                            </Button>
                        </div>
                    ) : (
                        <Button
                            component={Link}
                            to="/auth"
                            variant="contained"
                            color="primary"
                        >
                            Sign In
                        </Button>
                    )}
                </Toolbar>

            </AppBar >
        </>
    );

}

export default Navbar
import * as api from "../api/index.js";

export const signin = (formData, navigate) => async (dispatch) => {
    try {

        // LogIn the user 
        const res = await api.signIn(formData);


        console.log(res)

        // After signin dispath to reducer for Auth Function
        // This will store the user info including token in localstorage for the session
        dispatch({ type: "AUTH", payload: res.data })

        // Navigate To Home Page
        navigate('/')

    } catch (error) {
        console.log(error)
    }
}

export const signup = (formData, navigate) => async (dispatch) => {
    try {

        // Signup the user 
        const { data } = api.signUp(formData);

        dispatch({ type: "AUTH", payload: data })

        // Navigate To Home Page
        navigate('/')

    } catch (error) {
        console.log(error)
    }
}
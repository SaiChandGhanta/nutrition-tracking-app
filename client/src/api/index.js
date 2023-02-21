
// This is the api for communicating with backend
import axios from 'axios';

// create API base '/posts'
const API = axios.create({ baseURL: 'http://localhost:5000' })

// Send the stored token from frontend with each request to backend so that middleware can verify it
API.interceptors.request.use((req) => {

    // req.headers.Authorization - parameter
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
})

// API Calls
export const signIn = (formData) => API.post('/users/signin', formData)
export const signUp = (formData) => API.post('/users/signup', formData)
export const gstore = (result) => API.post('/users/google-signup', result)
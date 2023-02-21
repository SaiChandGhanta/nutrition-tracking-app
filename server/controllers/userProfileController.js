import * as userProfileService from './../services/userProfileService.js'

// utilty functions to return success and failure messages
const setErrorResponse = (error, response) => {
    response.status(500);
    response.json(error);
}

const setSuccessResponse = (obj, response) => {
    response.status(200);
    response.json(obj);
}


export const getProfile = async (request, response) => {
    try {
        const id = request.params.id;
        const userProfile = await userProfileService.getProfile(id);
        setSuccessResponse(userProfile, response);
    } catch(error) {
        setErrorResponse(error, response);
    }
}


export const updateProfile = async (request, response) => {
    try {
        const id = request.params.id;
        const payload = request.body;
        const updatedProfile = await userProfileService.updateProfile(id, payload);
        setSuccessResponse(updatedProfile, response);
    } catch(error) {
        setErrorResponse(error, response);
    }
}

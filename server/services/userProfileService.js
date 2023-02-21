import userProfileModel from "../models/profile.js";

export const updateProfile = (userProfileId, data) => {
    console.log('Received data '+data)
    return userProfileModel.findOneAndUpdate({_id: userProfileId}, data, {new: true})
}

export const getProfile = (userProfileId) => {
    return userProfileModel.findById(userProfileId)
}
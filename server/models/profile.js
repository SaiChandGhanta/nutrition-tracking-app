import mongoose from 'mongoose'

var userProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }, 
    firstName : {
        type : String,
        required: true
    },
    lastName : {
        type: String,
        required: true     
    },
    age : {
        type: Number
    },
    email : {
        type: String,
        required: true     
    },
    weight : {
        type: Number
    },
    height : {
        type: Number
    },
    targetWeight : {
        type: Number
    }
}, {
    timestamps: true
})

userProfileSchema.virtual('id', () => this._id.toHexString());
userProfileSchema.set('toJSON', { virtuals: true });

const userProfileModel = mongoose.model('userProfile', userProfileSchema);

export default userProfileModel
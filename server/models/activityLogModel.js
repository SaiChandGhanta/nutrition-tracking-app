import mongoose from "mongoose";

const activityLogSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }, 
    activity: {
        type: String,
        required: true
    },
    activityType: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    startTime: {
        type: Date,
        default: Date.now()
    },
    calorieBurn: { 
        type: Number, 
        required: true
    }
},{
    timestamps: true
})

activityLogSchema.virtual('id', () => this._id.toHexString());
activityLogSchema.set('toJSON', { virtuals: true });

const activityLogModel = mongoose.model('activityLog', activityLogSchema)

export default activityLogModel;
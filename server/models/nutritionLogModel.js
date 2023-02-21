import mongoose from "mongoose";

const nutritionLogSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }, 
    foodId: {
        type: String,
        required: true
    },
    foodLabel: {
        type: String,
        required: true
    },
    foodCategory: {
        type: String,
        required: true
    },
    intakeTime: {
        type: Date,
        default: Date.now()
    },
    measure: { // Always saved in grams and converted as per representation needs
        type: Number, 
        required: true
    }, 
    totalNutrients: {
        type: Map,
        of: {
            label: String,
            quantity: mongoose.Types.Decimal128,
            unit: String
        }
    },
    totalDaily: {
        type: Map,
        of: {
            label: String,
            quantity: mongoose.Types.Decimal128,
            unit: String
        }
    }
},{
    timestamps: true
})

nutritionLogSchema.virtual('id', () => this._id.toHexString());
nutritionLogSchema.set('toJSON', { virtuals: true });

const nutritionLogModel = mongoose.model('nutritionLog', nutritionLogSchema)

export default nutritionLogModel;
import nutritionLogModel from "../models/nutritionLogModel.js";

export const save = (newLogEntry) => {
    const intakeLog = new nutritionLogModel(newLogEntry);
    return intakeLog.save()
}

export const search = (query) => {
    const params = { ...query };
    return nutritionLogModel.find(params).sort('-intakeTime').exec();
}


export const deleteEntries = (data) => {
    if (!data.entryIds) return
    console.log(data.entryIds)
    return nutritionLogModel.deleteMany({_id: data.entryIds})
}
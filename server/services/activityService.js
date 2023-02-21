import activityLogModel from "../models/activityLogModel.js";

export const save = (newLogEntry) => {
    const intakeLog = new activityLogModel(newLogEntry);
    return intakeLog.save()
}

export const search = (query) => {
    const params = { ...query };
    return activityLogModel.find(params).sort('-intakeTime').exec();
}


export const deleteEntries = (data) => {
    if (!data.entryIds) return
    console.log(data.entryIds)
    return activityLogModel.deleteMany({_id: data.entryIds})
}
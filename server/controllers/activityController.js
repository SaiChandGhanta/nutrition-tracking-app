import * as activityService from '../services/activityService.js'
import winston from 'winston';


const logger = winston.createLogger({
    transports: [
        new winston.transports.Console()
    ]
});

// utilty functions to return success and failure messages
const setErrorResponse = (error, response) => {
    response.status(500);
    response.json(error);
}

const setSuccessResponse = (obj, response) => {
    response.status(200);
    response.json(obj);
}


export const createActivityLog = async (request, response) => {
    try {
        const payload = request.body;
        payload.user = request.userId;
        const intakeLog = await activityService.save(payload);
        setSuccessResponse(intakeLog, response);
    } catch(error) {
        setErrorResponse(error, response);
    }
}


export const listActivity = async (request, response) => {
    try {
        const query = {};
        const userId = request.userId;
        if (userId) query.userId=userId
        const intakeLogs = await activityService.search(query);
        setSuccessResponse(intakeLogs, response);
    } catch(error) {
        setErrorResponse(error, response);
    }
}


export const deleteActivity = async (request, response) => {
    try {
        const payload = request.body;
        const deletedLogs = await activityService.deleteEntries(payload);
        setSuccessResponse(deletedLogs, response);
    } catch(error) {
        setErrorResponse(error, response);
    }
}
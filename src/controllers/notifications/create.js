"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNotification = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const requestCheker_1 = require("../../utilities/requestCheker");
const notifications_1 = require("../../models/notifications");
const expo_server_sdk_1 = require("expo-server-sdk");
const sequelize_1 = require("sequelize");
const user_1 = require("../../models/user");
const requestHandler_1 = require("../../utilities/requestHandler");
const createNotification = async (req, res) => {
    const requestBody = req.body;
    const emptyField = (0, requestCheker_1.requestChecker)({
        requireList: ['notificationName', 'notificationMessage'],
        requestData: requestBody
    });
    if (emptyField.length > 0) {
        const message = `invalid request parameter! require (${emptyField})`;
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response);
    }
    try {
        const users = await user_1.UserModel.findAll({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 }
            },
            attributes: ['userFcmId']
        });
        for (let i = 0; users.length > i; i++) {
            if (users[i].userFcmId !== null) {
                void sendNotification({
                    expoPushToken: users[i].userFcmId,
                    data: {
                        title: requestBody.notificationName,
                        body: requestBody.notificationMessage
                    }
                });
            }
        }
        await notifications_1.NotificationModel.create(requestBody);
        const response = response_1.ResponseData.default;
        const result = { message: 'success' };
        response.data = result;
        return res.status(http_status_codes_1.StatusCodes.CREATED).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.createNotification = createNotification;
const sendNotification = async ({ expoPushToken, data }) => {
    console.log('expoPushToken', expoPushToken);
    console.log('data', process.env.ACCESS_TOKEN);
    const expo = new expo_server_sdk_1.Expo({ accessToken: process.env.ACCESS_TOKEN, useFcmV1: true });
    const chunks = expo.chunkPushNotifications([{ to: expoPushToken, ...data }]);
    const tickets = [];
    for (const chunk of chunks) {
        try {
            const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
            tickets.push(...ticketChunk);
        }
        catch (error) {
            console.error(error);
        }
    }
    let response = '';
    for (const ticket of tickets) {
        if (ticket.status === 'error') {
            if (ticket.details != null && ticket.details.error === 'DeviceNotRegistered') {
                response = 'DeviceNotRegistered';
            }
        }
        if (ticket.status === 'ok') {
            response = ticket.id;
        }
    }
    return response;
};

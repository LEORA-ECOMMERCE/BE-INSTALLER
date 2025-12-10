"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPushNotification = void 0;
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/naming-convention */
const axios_1 = __importDefault(require("axios"));
const sendPushNotification = ({ fcmTokens, notification, data }) => {
    const fcm_payload = {
        registration_ids: fcmTokens,
        notification,
        data,
        apns: {
            payload: { aps: { 'mutable-content': 1 } },
            fcm_options: {
                ...(Boolean(notification.image) && {
                    image: notification.image
                })
            }
        }
    };
    const fcm_config = {
        headers: {
            Authorization: 'key=' +
                'AAAAjHjTLJY:APA91bFAigk7ho37Vn0ga6x1obKotZMJYx5FEhPaNbR56uyolZXt_X3eCHUy_ziVQTFPfQ86TvyjiNjG4QGWINTBp9MLLoExW6ONWZSfzd9mUrjBBG-BE7uhoY0jEbPqAaAnVdxNM1sp',
            'Content-Type': 'application/json'
        }
    };
    console.log('hello');
    axios_1.default
        .post('https://fcm.googleapis.com/fcm/send', {
        to: 'ExponentPushToken[EHOKn4BvWavkvxRwFUvP0k]',
        priority: 'normal',
        data: {
            experienceId: '@yourExpoUsername/yourProjectSlug',
            scopeKey: '@yourExpoUsername/yourProjectSlug',
            title: "📧 You've got mail",
            message: 'Hello world! 🌐'
        }
    }, fcm_config)
        .then((fcm_response) => {
        console.log(fcm_response.data);
        return true;
    })
        .catch((fcm_error) => {
        console.log(fcm_error);
        return false;
    });
};
exports.sendPushNotification = sendPushNotification;

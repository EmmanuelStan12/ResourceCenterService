const express = require('express');
const { createNotification, deleteNotification, getNotifications, deleteUserNotification } = require('../controllers/NotificationController');
const { verifyJWTMiddleware } = require('../util/JSONWebToken');

const router = express.Router();


router.post('/create-notification', verifyJWTMiddleware, createNotification);

router.delete('/delete-notification', verifyJWTMiddleware, deleteNotification);

router.delete('/delete-user-notification', verifyJWTMiddleware, deleteUserNotification)

router.get('/', verifyJWTMiddleware, getNotifications)

module.exports.notificationRouter = router;
const { Database } = require("../data/Database");

class Notification {
    constructor(id, resource, route, title, date) {

    }

    static async create(_id, data) {
        const notification = { ...this.default(), ...data }
        const response = await Database.instance().create(notification, 'notifications');
        return response;
    }

    static async delete(_id, userId, data) {

    }

    static async getNotificationsByTrack(track_id) {

    }

    static async getNotificationsByUserID(user_id) {
        const response = await Database.instance().getDocuments('notifications')
        const notifications = response.filter((notification) => {
            return notification.users.includes(user_id);
        }).map((notification) => {
            delete notification.users;
            return notification;
        })
        return notifications;
    }

    static default() {
        const notification = {
            id: null,
            resource: null,
            route: null,
            title: null,
            date: new Date().toISOString(),
            users: null,
            subtitle: null,
            tracks: null,
            subtitle: null
        }
        return notification;
    }
}

module.exports.Notification = Notification;
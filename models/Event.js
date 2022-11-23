const { Database } = require('../data/Database')

class Event {
    default() {
        return {
            id: null,
            sender: null,
            receivers: null,
            title: null,
            description: null,
            dateCreated: null,
            dateScheduled: null
        }
    }

    static async create(data) {
        const receivers = data.receivers.map(async (r) => {
            return await Database.instance().findByID(r, 'users');
        })
        return await Database.instance().create({ ...data, receivers }, 'events')
    }

    static async getEvents(id) {
        const events = await Database.instance().getDocuments('events')
        return events.map((event) => {
            const ids =  event.recievers.map((r) => r.id)
            if (id in ids) {
                return event
            }
            return null;
        }).filter((event) => event !== null);
    }
}

module.exports.Event = Event;
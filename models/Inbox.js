const { Database } = require("../data/Database")

class Inbox {
    default() {
        return {
            id: null,
            sender: null,
            receiver: null,
            title: null,
            description: null,
            imageUrl: null,
            senderID: null,
            receiverName: null
        }
    }

    static async create(data) {
        const receiver = await Database.instance().findByID(data.receiver, 'users');
        const result = await Database.instance().create({ ...data, receiver: receiver }, 'inbox');
        return result;
    }

    static async getSentInbox(id) {
        const result = await Database.instance().getDocuments('inbox')
        return result.filter((inbox) => {
            return inbox.sender.id === id
        });
    }

    static async getReceivedInbox(id) {
        const result = await Database.instance().getDocuments('inbox')
        return result.filter((inbox) => {
            return inbox.receiver.id === id
        });
    }
}

module.exports.Inbox = Inbox;
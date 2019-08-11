const username = process.env.USERNAME || 'admin';
const password = process.env.PASSWORD || '123';
const localhost = process.env.HOST || 'cluster0-8n8vu.mongodb.net/costdb?retryWrites=true';

module.exports = {
    infoConection: {
        url: `mongodb+srv://${username}:${password}@${localhost}`
    }
}
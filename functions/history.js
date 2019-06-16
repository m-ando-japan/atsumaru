const moment = require('moment');

module.exports = class History {
  constructor(admin) {
    this.admin = admin
  }

  openEvent(eventId, message) {
    return this.admin
      .firestore()
      .collection('events')
      .doc(eventId)
      .get()
      .then(doc => {
        if (!doc.exists) throw new Error('Event not found')
        return this.admin
          .firestore()
          .collection('events')
          .doc(eventId)
          .collection('history')
          .add({
            date: moment().format(),
            message: message,
            twitterId: 'hogeeeee'
          });
      })
  }

  onRequest(request, response) {
    response.set('Access-Control-Allow-Origin', '*')
    response.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST')
    response.set('Access-Control-Allow-Headers', 'Content-Type')

    if (request.method === 'POST') {
      const eventId = request.body.eventId
      const message = request.body.message
      this.openEvent(eventId, message)
        .then(doc => {
          // 保存に成功した際の処理
          return response.status(200).json({
            eventId: eventId
          });
        })
        .catch(e => {
          // 保存に失敗した際の処理
          console.log('Error', e)
          return response.sendStatus(403)
        })
    }

    return response.sendStatus(500);
  }
}

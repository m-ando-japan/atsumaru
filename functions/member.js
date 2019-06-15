module.exports = class Event {
  constructor(admin) {
    this.admin = admin;
  }

  joinEvent(eventId, email) {
    return this.admin.firestore().collection('events').doc(eventId).get().then(doc => {
        if (!doc.exists) throw new Error('Event not found');
        return this.admin.firestore().collection('events').doc(eventId).collection('members').add({email: email});
    });
    
  }

  onRequest(request, response) {
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST');
    response.set('Access-Control-Allow-Headers', 'Content-Type');

    if (request.method === "POST") {
      const eventId = request.body.eventId;
      const email = request.body.email;
      this.joinEvent(eventId, email).then((doc) => {
        // 保存に成功した際の処理
        return response.status(200).json({eventId: eventId});
      }).catch((e) => {
        // 保存に失敗した際の処理
        console.log('Error', e);
        return response.sendStatus(403);
      });

    }
  }
}

module.exports = class Event {
  constructor(admin) {
    this.admin = admin;
  }

  getEvent(eventId) {
    return this.admin.firestore().collection('events').doc(eventId).get();
  }

  getTags(eventId) {
    return this.admin.firestore().collection('events').doc(eventId).collection('tag').get().then(querySnapshot => {
      const tags = [];
      querySnapshot.forEach(doc => {
        const tag = doc.data();
        tags.push({name: tag.name, id: doc.id});
      });
      return tags;
    });
  }
  
  onRequest(request, response) {
    // イベント情報を取得する
    if (request.method === 'GET') {
      // request.quest.eventId = hoge 
      // ex.) event?eventIId=hoge

      Promise.all([
        this.getEvent(request.query.eventId),
        this.getTags(request.query.eventId)
      ]).then(results => {
        const event = results[0];
        const tags = results[1];
        if (!event.exists) {
          return response.sendStatus(404);
        }
        const responseObject = Object.assign(
          {},
          event.data(),
          {tags: tags}
        );
        return response.status(200).json(responseObject);
      }).catch(e => {
        console.log('Error', e);
        response.sendStatus(500);
      });
    }
  }
};

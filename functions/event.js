module.exports = class Event {
  constructor(admin) {
    this.admin = admin;
  }

  getEvent(eventId) {
    return this.admin.firestore().collection('events').doc(eventId).get();
  }

  addEvent(theme, address, tags) {
    return this.admin.firestore().collection('events').add({
      "theme": theme,
      "address": address,
      "tags": tags
    });
  }

  // upsertTag(tagName, eventId) {
  //   return this.admin.firestore().collection('tags').doc(tagName).get().then(doc => {
  //     if (!doc.exist) {
  //       return this.admin.firestore().collection('tags').doc(tagName).set({eventIds: [eventId]});
  //     }
  //     return doc;
  //   }).then(doc => {
  //     return doc.collection('eventIds').add(eventId);
  //   });
  // }
  
  onRequest(request, response) {
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    // イベント情報を取得する
    if (request.method === 'GET') {
      // request.quest.eventId = hoge 
      // ex.) event?eventIId=hoge

      this.getEvent(request.query.eventId).then(doc => {
        if (!doc.exists) {
          return response.sendStatus(404);
        }
        const event = doc.data();
        const responseObject = {
          theme: event.theme || '',
          address: event.address || '',
          tags: event.tags || [],
          memberCount: event.members ? event.members.length : 0
        };
        return response.status(200).json();
      }).catch(e => {
        console.log('Error', e);
        response.sendStatus(500);
      });
    }else if (request.method === "POST") {
      const theme = request.body.theme;
      const address = request.body.address;
      const tags = request.body.tags;
      // TODO タグから逆引きできるようにしておく
      // return Promise.all(tags.map(tag => this.upsertTag(tag, doc.id)));
      this.addEvent(theme, address, tags).then((doc) => {
        // 保存に成功した際の処理
        return response.status(200).json({id: doc.id});
      }).catch((e) => {
        // 保存に失敗した際の処理
        console.log('Error', e);
        return response.sendStatus(403);
      });
    }
  }
};

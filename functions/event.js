module.exports = class Event {
  constructor(admin) {
    this.admin = admin;
  }

  getEvent(eventId) {
    return this.admin.firestore().collection('events').doc(eventId).get().then(snapShot => {
      if (!snapShot.exists) return {};
      const event = snapShot.data();
      return {
        theme: event.theme || '',
        address: event.address || '',
        tags: event.tags || [],
        memberCount: event.members ? event.members.length : 0
      };
    });
  }

  getHistory(eventId) {
    return this.admin.firestore().collection('events').doc(eventId).collection('history').get().then(snapShot => {
      if (!snapShot.exists) return [];
      const history = [];
      snapShot.forEach(historyItem => {
        history.push({
          date: historyItem.date,
          twitterId: historyItem.twitterId || '',
          message: historyItem.message || ''
        });
      });
      return history;
    });
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

      Promise.all([
          this.getEvent(request.query.eventId),
          this.getHistory(request.query.eventId),
      ]).then(results => {
        const event = results[0];
        const history = results[1];
        if (JSON.stringify(event) === '{}') {
          return response.sendStatus(404);
        }
        return response.status(200).json(Object.assign({}, event, {history: history}));
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
    return response.sendStatus(500);
  }
};

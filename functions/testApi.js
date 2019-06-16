module.exports = class TestApi {
    constructor(admin) {
      this.admin = admin;
    }


    
    onRequest(request, response) {
      const theme = request.body.theme;
      const address = request.body.address;
      const tags = request.body.tags;

      // TODO タグから逆引きできるようにしておく
      // return Promise.all(tags.map(tag => this.upsertTag(tag, doc.id)));
      this.addEvent(theme, address, tags).then(() => {
        // 保存に成功した際の処理
        return response.sendStatus(200);
      }).catch((e) => {
        // 保存に失敗した際の処理
        console.log('Error', e);
        return response.sendStatus(403);
      });

      return response.sendStatus(500);
    }
  };
  
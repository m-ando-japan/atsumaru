// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

const Event = require('./event');
const TestApi = require('./testApi');

exports.event = functions.https.onRequest((request, response) => {
  new Event(admin).onRequest(request, response);
});
exports.testApi = functions.https.onRequest((request, response) => {
  new TestApi(admin).onRequest(request, response);
});

exports.testTag = functions.https.onRequest(async (req, res) => {
  var eventsId = req.events.id;
  var docRef = admin.firestore().collection('events').doc(eventsId).collection('tag');
  docRef.add({
    name: 'hogehoge'
  }).then(() => {
      // 保存に成功した際の処理
      res.sendStatus(200);
      return;
    }
  ).catch((err) => {
      // 保存に失敗した際の処理
      res.sendStatus(403);
      res.err(err);
      return;
  });
});
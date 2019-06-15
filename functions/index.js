// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

const Event = require('./event');

// The Firebase Admin SDK to access the Firebase Realtime Database.

// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.addMessage = functions.https.onRequest(async (req, res) => {
  if (req.method !== 'POST') {
    res.sendStatus(400);
    return;
  }
  // Grab the text parameter.
  const original = req.query.text;
  // Push the new message into the Realtime Database using the Firebase Admin SDK.
  const snapshot = await admin.database().ref('/messages').push({original: original});
  // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
  res.sendStatus(200);
  console.log({eventId: 1, theme: 'theeeeme', address: 'aaaaaadddreeesss'});
  //res.redirect(303, snapshot.ref.toString());
});

exports.event = functions.https.onRequest((request, response) => {
  new Event(admin).onRequest(request, response);
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

exports.testEvent = functions.https.onRequest(async (req, res) => {
  admin.firestore().collection('events').add({
    "theme": "hoge",
    "pref": "fuga"
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


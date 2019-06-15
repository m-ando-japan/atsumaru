// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

const Event = require('./event');
const Member = require('./member')
const History = require('./history');

exports.event = functions.https.onRequest((request, response) => {
  new Event(admin).onRequest(request, response);
});

exports.member = functions.https.onRequest((request, response) => {
  new Member(admin).onRequest(request, response);
});

exports.history = functions.https.onRequest((request, response) => {
  new History(admin).onRequest(request, response);
});
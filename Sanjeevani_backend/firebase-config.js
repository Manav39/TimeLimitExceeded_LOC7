var admin = require("firebase-admin");

var serviceAccount = require("./sih-tle-firebase-adminsdk-nexvu-b48cccd1dd.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
module.exports = db;

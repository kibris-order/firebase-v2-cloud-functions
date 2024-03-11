import {onRequest} from "firebase-functions/v2/https";
import {onDocumentCreated,
  onDocumentDeleted} from "firebase-functions/v2/firestore";
import * as logger from "firebase-functions/logger";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});


export const onUserCreated = onDocumentCreated("users/{userId}", (event) => {
  const snapshot = event.data;
  if (!snapshot) {
    console.log("No data associated with the event");
    return;
  }
  const data = snapshot.data() as { name: string, age: string };

  const name = data.name;
  logger.info("onUserCreated logs!", {displayName: name, ...data});
});


export const userDeleted = onDocumentDeleted("users/{userId}", (user) => {
  // Get an object representing the document
  // e.g. {'name': 'Marie', 'age': 66}
  const data = user.data?.data() as { name: string, age: string };
  logger.info("onUserCreated logs!", {...data});
  // perform more operations ...
});
